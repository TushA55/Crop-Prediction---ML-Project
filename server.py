from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pickle
import numpy as np

DT = None
NB = None
RF = None
SVM = None

with open('ml_models/DecisionTree.pkl', 'rb') as f:
    DT = pickle.load(f)

with open('ml_models/NBClassifier.pkl', 'rb') as f:
    NB = pickle.load(f)

with open('ml_models/RFClassifier.pkl', 'rb') as f:
    RF = pickle.load(f)

with open('ml_models/SVMClassifier.pkl', 'rb') as f:
    SVM = pickle.load(f)

app = Flask(__name__, static_folder='static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({
        "status": 200,
        "ip": request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    })


@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    data = request.json
    features = np.array([[
        np.int64(data['N']),
        np.int64(data['P']),
        np.int64(data['K']),
        np.float64(data['temperature']),
        np.float64(data['humidity']),
        np.float64(data['ph']),
        np.float64(data['rainfall']),
    ]])
    crop_name = RF.predict(features)[0]
    print(crop_name)
    return jsonify({"crop": crop_name})


app.run(debug=True, host="localhost", port=5000)
