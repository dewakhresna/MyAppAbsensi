import cv2
import numpy as np

import base64

def base64_to_image(base64_string):
    image_data = base64.b64decode(base64_string.split(',')[1])
    np_array = np.frombuffer(image_data, dtype=np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return image

def get_image_db(filename):
    path = f"../backend/uploads/{filename}"
    image = cv2.imread(path)
    return image

if __name__ == "__main__":
    image = get_image_db("1727421328859.jpg")
    print(image)