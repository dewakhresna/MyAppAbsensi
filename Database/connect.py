import pymysql
from Database.config import load_config

def connect_to_mysql():
    config = load_config(filename="Database/mysql.ini", section="mysql")
    try:
        conn = pymysql.connect(
            host=config.get('host'),
            user=config.get('user'),
            password=config.get('password'),
            port=int(config.get('port')),
            database=config.get('db')
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