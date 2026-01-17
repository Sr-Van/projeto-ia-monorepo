from flask import Flask, jsonify, request
from flask_cors import CORS
from services.ai_service import classify_emails
from services.data_service import is_pdf_long, extract_text_from_pdf

app = Flask(__name__)
CORS(app)


@app.route('/analyze', methods=['POST'])
def analyze_email():
  email = request.json['email']
  
  result = classify_emails(email)
  return jsonify(result), 200

@app.route('/analyze/doc', methods=['POST'])
def analyze_email_pdf():
  if 'file' not in request.files:
    return jsonify({'error': 'Nenhum arquivo enviado'}), 400

  file = request.files['file']
  if file.filename == '':
            return 'Nenhum arquivo selecionado'
  
  if file and file.filename.endswith('.pdf'):
     if is_pdf_long(file.stream):
        return jsonify({'error': 'Arquivo PDF muito grande'}), 400
     text = extract_text_from_pdf(file.stream)
     result = classify_emails(text)
     return jsonify(result), 200
  
  if file and file.filename.endswith('.txt'):
    text = file.read().decode('utf-8')
    result = classify_emails(text)
    return jsonify(result), 200

  return jsonify({'error': 'Formato de arquivo inválido'}), 400

if __name__ == '__main__':
  app.run(debug=True, port=8000, host='0.0.0.0')