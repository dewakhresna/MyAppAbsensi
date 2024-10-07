import pymysql
from Database import settings
def connect_to_mysql():
    try:
        conn = pymysql.connect(
            host=settings.HOST,
            user=settings.USER,
            password=settings.PASSWORD,
            port=int(settings.PORT),
            database=settings.DB
        )
        return conn
    except Exception as e:
        print(f"Error connecting to MySQL: {e}")

if __name__ == "__main__":
    connect = connect_to_mysql()
    if connect:
        print("Connected to MySQL database")
    else:
        print("Failed to connect to MySQL database")