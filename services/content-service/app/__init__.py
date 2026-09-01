from dotenv import load_dotenv

# See auth-service/app/__init__.py for why override=True matters:
# it makes .env always win over a stale variable left in the shell session.
load_dotenv(override=True)