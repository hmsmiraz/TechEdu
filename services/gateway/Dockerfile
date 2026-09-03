FROM nginx:1.27-alpine

# nginx's official image auto-runs envsubst on any *.template file in
# /etc/nginx/templates/ at container startup, writing the result to
# /etc/nginx/conf.d/ — this is what makes AUTH_SERVICE_HOST etc. dynamic
# without any custom entrypoint script.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
