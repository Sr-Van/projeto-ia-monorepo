from flask import Flask, jsonify, request
from services.ai_service import classify_emails

app = Flask(__name__)

#Primeira rota apenas para teste
@app.route('/teste', methods=['GET'])
def hello_world():
  return jsonify({'message': 'Hello, World!'}), 200

@app.route('/analyze', methods=['POST'])
def analyze_email():
  email = request.json['email']
  
  result = classify_emails(email)
  return jsonify(result), 200


if __name__ == '__main__':
  app.run(debug=True, port=8000, host='0.0.0.0')