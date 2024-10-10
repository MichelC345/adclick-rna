Esta aplicação pode ser executada seguindo os passos 1 e 2.

## Passo 1: Como executar o front-end

Dentro de /Client

```bash
#instalação dos pacotes
npm install
#execução
npm run dev
```

## Passo 2: Como executar o back-end

Dentro de /Server

```bash
#instalação dos pacotes, caso esteja no linux
pip install fastapi uvicorn
#instalação dos pacotes, caso esteja no windows
py -m pip install fastapi uvicorn
#execução
uvicorn app:app --reload
```

A interface com o usuário (front-end) poderá ser acessada em [http://localhost:3000](http://localhost:3000)

A API em python estará interagindo com o modelo treinado, e atendendo requisições na porta 8000 ([http://localhost:8000](http://localhost:8000))
