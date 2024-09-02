from migration import fetch_image_from_mysql

import cv2
import numpy as np

from deepface import DeepFace

def byte_to_image(byte_view):
    image_array = np.frombuffer(byte_view, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    return image

def verification_check(nomor_induk_karyawan, image_form):
    image_db = fetch_image_from_mysql(nomor_induk_karyawan=nomor_induk_karyawan)
    image_db = byte_to_image(image_db)

    result = DeepFace.verify(
        img1_path = image_db,
        img2_path = image_form,
        )
    
    return result['verified']