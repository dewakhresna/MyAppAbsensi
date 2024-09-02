import cv2
import numpy as np

import base64

def byte_to_image(byte_view):
    image_bytes = byte_view.tobytes()
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    return image

def base64_to_image(base64_string):
    image_data = base64.b64decode(base64_string.split(',')[1])
    np_array = np.frombuffer(image_data, dtype=np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image