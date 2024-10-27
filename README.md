# Rede Neural Artificial para a predição de preferências de cliques em determinadas posições de anúncios

Esta aplicação utiliza uma Rede Neural Artificial (RNA), cujo treinamento utiliza a base de dados disponível [neste link](https://www.kaggle.com/datasets/marius2303/ad-click-prediction-dataset/data) para realizar predições de clicks em anúncios.
Dispõe-se de duas funcionalidades: 1. Administrador, para observar as predições de usuários hipotéticos e; 2. Usuário, para inserir informações como se fosse um usuário efetivo
para armazenamento de dados para futuros treinamentos.


## Requisitos mínimos
Sistema operacional: Windows 10 ou Linux Ubuntu (versão >= 22.04) e seus derivados, ex: Linux Mint.
Necessário ter Node.js (versão >= 21.1.0) e npm (versão >= 10.4.0). Instruções para a instalação destes pacotes podem ser encontradas [aqui](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Esta aplicação pode ser executada abrindo o terminal/prompt de comandos e seguindo os passos 1 e 2.

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
#instalação dos pacotes
pip install fastapi uvicorn impbalance pandas seaborn numpy tensorflow sklearn
#execução
uvicorn app.app:app --reload
```

Em alguns instantes, a aplicação poderá ser acessada em [http://localhost:3000](http://localhost:3000).
