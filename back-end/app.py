from flask import Flask, jsonify, request

app = Flask(__name__)

#Primeira rota apenas para teste
@app.route('/teste', methods=['GET'])
def hello_world():
  return jsonify({'message': 'Hello, World!'}), 200

if __name__ == '__main__':
  app.run(debug=True)