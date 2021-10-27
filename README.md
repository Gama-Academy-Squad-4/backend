# Programa Gama Coders

## Squad 4 - Projeto GamaBTC.

![](https://img.shields.io/badge/license-MIT-blue.svg)

## Objetivo

Construir um sistema web para monitorar as transações com bitcoin do usuário. Permitindo o acompanhamento da evolução do valor consolidado, comparando o valor de bitcoin na data da compra e o valor atual.

## Prévia

    https://gama-backend-api.herokuapp.com/

## Documentação

    https://app.swaggerhub.com/apis/gamachallenge/api-bitcoin/1.0.0

## Tecnologias
O projeto foi desenvolvido utilizando:
* NodeJs
* Express
* MongoDB
* Mongoose
* Jest
* Supertest
* Swagger
* Axios
* Moment

# Rodando local
Para iniciar a API em modo de desenvolvimento:

1. Instale as dependências 
```bash
npm install
```

2. Inicie o MongoDB
```bash
docker-compose up -d
```

3. Crie um .env baseado no exemplo
```bash
cp .env.example .env
```

4. Inicie o job
```bash
npm start
```

# Testes
Verificar os testes:
```bash
npm test
```
# Release
O CI/CD desse projeto atualiza o ambiente de `staging` assim que um código é mergeado na branch `main`.

O projeto apenas é atualizado em produção quando uma nova release é gerada.

