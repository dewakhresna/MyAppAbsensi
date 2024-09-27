import os
from dotenv import load_dotenv

# Load environment variables based on the APP_ENV
load_dotenv()

# Access database
DB = os.getenv('DB')
USER = os.getenv('USER')
PASSWORD = os.getenv('PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')