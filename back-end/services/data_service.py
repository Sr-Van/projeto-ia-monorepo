import pypdf
import nltk
from nltk.corpus import stopwords
from nltk.stem import RSLPStemmer
import re

nltk.download('stopwords')
nltk.download('rslp')

def is_pdf_long(pdf):
  pdf = pypdf.PdfReader(pdf)
  if len(pdf.pages) > 2:
    return True  
  return False

def extract_text_from_pdf(pdf):
  pdf = pypdf.PdfReader(pdf)
  text = ""
  for page in pdf.pages:
    text += page.extract_text()

  text = pre_processamento_email(text)
  return text

# mantendo o pre-processamento e stemming no data_service pois o projeto é delimitado e simples para o teste técnico
# Se fosse escalar, cada serviço teria sua classe separadamente para ser utilizado pela API
def pre_processamento_email(texto):
    tokens = re.findall(r'\b[a-zà-úü]+\b', texto.lower())

    stop = set(stopwords.words('portuguese'))
    tokens_sem_stop = [t for t in tokens if t not in stop]

    # nesse caso escolhi o steemer ao lematizador pois na nltk tive dificuldade de encontrar um lematizador português
    stemmer = RSLPStemmer()
    tokens_stem = [stemmer.stem(t) for t in tokens_sem_stop]
    
    texto_limpo = ' '.join(tokens_stem)
    return texto_limpo