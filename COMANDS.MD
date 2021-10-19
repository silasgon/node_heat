##Esta estratégia de desenvolvimento de API em NODEJS, segue os seguintes passos.

1 - com o terminal na pasta do projeto digite
    $ (npm) yarn init -y

2 - instalar as dependências que vão auxiliar o desenvolvimento.
    - yarn add express
    como dependencia de desenvolvimento serão intalados as seguintes bibliotecas:
    - yarn add -D @types/express typescript ts-node-dev
3 - Crie uma pasta "src" onde serão colocados os arquivos do projeto
    e dentro desta pasta crie o arquivo app.ts
4 - É necessario iniciar o typescript no projeto com isso no terminal digite o seguinte comando:
    - yarn tsc --init
    com isso é criado o arquivo "tsconfig.json"
5 - No arquivo "tsconfig.json"poderão ser algumas configurações escolhidas pelo desenvolvedor.
6 - Configurar o arqui app.ts da pasta "src".
7 - No arquivo "package.json" configure o script para rodar o servidor automaticamente.

    "scripts": {
        "dev": "ts-node-dev src/app.ts"
    },
8 - Instalar o Prisma como dependencia de desenvolvimento
    - yarn add prima -D
    Com o prima instalado vamos iniciar ele no projeto
    - yarn prisma init


