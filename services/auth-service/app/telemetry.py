import os

from opentelemetry import trace, metrics
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor

_initialized = False


def setup_telemetry(app, engine, service_name: str):
    """Wires up OpenTelemetry tracing + metrics for a FastAPI service.

    Opt-in: only activates if OTEL_EXPORTER_OTLP_ENDPOINT is explicitly set.
    Without it, this is a complete no-op — no instrumentation overhead, no
    background export attempts, no noisy connection-refused retries when
    the observability stack (see docker-compose.observability.yml) isn't
    running. This matters because most local dev sessions won't have it up.
    """
    global _initialized
    endpoint = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
    if _initialized or not endpoint:
        return

    resource = Resource.create({"service.name": service_name})

    # Traces
    tracer_provider = TracerProvider(resource=resource)
    tracer_provider.add_span_processor(
        BatchSpanProcessor(OTLPSpanExporter(endpoint=f"{endpoint}/v1/traces"))
    )
    trace.set_tracer_provider(tracer_provider)

    # Metrics
    metric_reader = PeriodicExportingMetricReader(
        OTLPMetricExporter(endpoint=f"{endpoint}/v1/metrics")
    )
    meter_provider = MeterProvider(resource=resource, metric_readers=[metric_reader])
    metrics.set_meter_provider(meter_provider)

    # Auto-instrument: every request becomes a trace, every DB query a span
    FastAPIInstrumentor.instrument_app(app)
    SQLAlchemyInstrumentor().instrument(engine=engine)

    _initialized = True