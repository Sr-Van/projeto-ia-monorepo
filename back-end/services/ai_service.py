from google import genai
from google.genai import types
import os
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('API_KEY')
client = genai.Client(api_key=api_key)

texts = [
  "Feliz natal e prospero ano novo!",
  "Feliz natal meu amigo, quando vamos fechar aquela negociacao sobre as compras de eletronicos?",
  """
  Olá equipe, bom dia.
  Gostaria de avisar que o relatório de vendas foi atualizado.
  Por favor, revisem a página 3 e me enviem o feedback até as 17h de hoje.
  """
]

rules = """
  Você é um classificador de uma empresa do setor financeiro que recebe um alto volume de emails diariamente.
  Analise o texto fornecido e determine se ele é "PRODUTIVO" ou "NAO_PRODUTIVO".
  Indique uma resposta formal sobre o assunto do e-mail caso seja "PRODUTIVO".

  Critérios PRODUTIVO: Contém solicitações de ação, prazos, entregas de arquivos, negociações ou agendamentos.
  Critérios NAO_PRODUTIVO: Apenas cumprimentos, comentários sociais, newsletters ou avisos genéricos sem ação necessária.
  """
def classify_emails(text: str) -> dict:
  response = client.models.generate_content(
      model="gemini-3-flash-preview",

      config= types.GenerateContentConfig(
        system_instruction=rules,
        temperature=0.0,
        response_mime_type="application/json",
        response_schema={
          "type": "object",
          "properties": {
            "is_productive": {"type": "BOOLEAN"},
            "confidence_score": {"type": "NUMBER"},
            "reason": {"type": "STRING"},
            "response": {"type": "STRING"}
          },
          "required": ["is_productive", "reason"]
        }
      ),
      contents=text
  )
  result = json.loads(response.text)
  print(result)
  return result


for text in texts:
  classify_emails(text)