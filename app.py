from model.model import verification_check
from processing.processing import base64_to_image

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def welcome():
    return "API Face Verification"

@app.route('/verification', methods=['POST'])
def verification():
    data = request.get_json()

    if not data or 'image' not in data or 'no_induk' not in data:
        return jsonify({'error': 'No image or no_induk in request'}), 400
    
    no_induk = data['no_induk']
    image_base64 = data['image']

    image = base64_to_image(image_base64)

    try:
        result = verification_check(nomor_induk_karyawan=no_induk, image_form=image)
        return jsonify({
            'status': 'success',
            'response': {
                'no_induk': str(no_induk),
                'verified': result
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)