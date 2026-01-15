import pypdf

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
  return text