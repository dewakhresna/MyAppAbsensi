from Database.connect import connect_to_mysql

def fetch_image_from_mysql(nomor_induk_karyawan):
    conn = connect_to_mysql()
    cur = conn.cursor()
    query = '''
            SELECT
                image
            FROM
                karyawan
            WHERE
                nomor_induk_karyawan = %s;
            '''
    cur.execute(query, (nomor_induk_karyawan,))
    rows = cur.fetchone()
    return rows[0]

def create_table():
    conn = connect_to_mysql()
    query = """
            CREATE TABLE IF NOT EXISTS karyawan (
                id_karyawan INT AUTO_INCREMENT PRIMARY KEY,
                nomor_induk_karyawan INT,
                email VARCHAR(50),
                nama VARCHAR(50),
                jenis_kelamin VARCHAR(20),
                no_telp VARCHAR(20),
                password VARCHAR(255),
                image BLOB
            )
            """
    try:
        cur = conn.cursor()
        cur.execute(query)
        conn.commit()
        print("Tabel karyawan berhasil dibuat!")

    except Exception as e:
        print(f"Terjadi kesalahan: {e}")
    finally:
        cur.close()
        conn.close()