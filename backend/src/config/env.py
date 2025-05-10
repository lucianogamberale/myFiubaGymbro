import os

from dotenv import load_dotenv

load_dotenv(override=True)

if not all([os.getenv("DB_URL")]):
    raise ValueError("Missing environment variables")

DB_URL = str(os.getenv("DB_URL"))
