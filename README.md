# AutoU Classificador de E-mail

Este projeto é um analisador de documentos inteligente que utiliza a API do Google Gemini para extrair insights e realizar análises de arquivos PDF e TXT. A aplicação utiliza uma arquitetura de monorepo com um back-end em Flask e um front-end moderno com Tailwind CSS.

## Tecnologias Utilizadas

- **Front-end:** HTML5, Tailwind CSS, JavaScript Vanilla.
- **Back-end:** Python, Flask, NLTK (Natural Language Toolkit).
- **IA:** Google Gemini Pro API.
- **Infraestrutura:** Docker & Docker Compose.
- **Deploy:** Vercel.

## Como rodar o projeto localmente

Você precisará do **Docker** e **Docker Compose** instalados.

### 1. Clonar o repositório

```bash
git clone https://github.com/Sr-Van/projeto-ia-monorepo.git
cd projeto-ia-monorepo
```

### 2. Configurar as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e adicione sua chave de API do Gemini:

```Snippet
GEMINI_API_KEY=sua_chave_api_aqui
```

### 3. Subir os Containers

Execute o comando abaixo para construir as imagens e iniciar os serviços (Front e Back) simultaneamente:

```Bash
docker-compose up --build
```

### 4. Acessar a aplicação

Após o carregamento, as portas disponíveis serão:

- **Front-end:** http://localhost:3000

- **Back-end (API):** http://localhost:8000

### Segurança e Limites (Rate Limit)

Para garantir o uso consciente da API e proteção do servidor, as seguintes travas foram implementadas:

CORS: A API está configurada para aceitar requisições apenas de origens autorizadas (localhost:3000, Live Server e domínios de produção).

Rate Limiting: O endpoint de análise está limitado a 1 requisição por minuto por endereço IP para evitar abusos nos créditos da API.
