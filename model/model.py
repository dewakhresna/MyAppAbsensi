from migration import fetch_image_from_mysql
from processing.processing import get_image_db

from deepface import DeepFace

def verification_check(nik, image_form, backends: str = 'opencv', metrics: str = 'cosine', models: str = 'VGG-Face'):
    filename = fetch_image_from_mysql(nik=nik)
    if filename is not None:
        image_db = get_image_db(filename=filename)
        result = DeepFace.verify(
            img1_path = image_db,
            img2_path = image_form,
            detector_backend = backends,
            distance_metric = metrics,
            model_name = models
            )
        return result
    else:
        return None