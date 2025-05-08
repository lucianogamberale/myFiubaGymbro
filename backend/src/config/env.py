import os

from dotenv import load_dotenv

load_dotenv(override=True)

if not all([os.getenv("DB_URL"), os.getenv("FRONTEND_URL")]):
    raise ValueError("Missing environment variables")

DB_URL = str(os.getenv("DB_URL"))
FRONTEND_URL = str(os.getenv("FRONTEND_URL"))
