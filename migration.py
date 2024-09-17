from Database.connect import connect_to_mysql

def fetch_image_from_mysql(nik: str):
    conn = connect_to_mysql()
    cur = conn.cursor()
    query = '''
            SELECT
                gambar
            FROM
                data_karyawan
            WHERE
                nik = %s;
            '''
    try:
        cur.execute(query, (nik,))
        rows = cur.fetchone()
        return rows[0]
    except Exception as e:
        print(f"Error: NIK {nik} tidak ditemukan/belum terdaftar")