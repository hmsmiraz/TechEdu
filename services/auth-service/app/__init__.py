from dotenv import load_dotenv

# Runs before any other app module (database, security, main) is imported,
# since Python imports this package __init__ first. This replaces the need
# to `source .env` in bash, which mangles special characters in values.
#
# override=True ensures .env always wins over any stale variable left in
# the shell's environment (e.g. from an earlier `export`/`set -a` in this
# same terminal session) — otherwise load_dotenv() silently skips values
# that already exist in os.environ.
load_dotenv(override=True)