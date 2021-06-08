<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

Projeto criado utilizando NEST.JS.


# Projeto: Ecommerce service to fav/unfav


# Introdução
Essa api foi criada como um serviço auxiliar externo de uma loja, se integra a api principal de produtos, tem um controle de usuários independente do serviço principal, e possibilida que o cliente favorite e desfavorite produtos, após 2 minutos da ação é enviado um e-mail ao cliente com sua lista atual de produtos favoritos.

# Como usar
Para usar esse projeto, deve clonar o repositório e fazer os seguintes comandos:

```bash
# instalar as dependencias 
$ yarn install

#rodar o projeto
$ yarn start

```





# Autenticação
Após logado é necessário passar o token que foi fornecido pela rota de login como um Bearer token.

# Error Codes
Os códigos de erro são:

1. Caso usuário tente acessar as rotas de favoritos com um token deslogado ou inválido
2. Caso passe um usuário invalido para login

```JSON
{
  "statusCode": 401,
  "message": "Unauthorized"
}
````

3. Caso tente registrar um novo usuário com um e-mail e/ou username já cadastrado

```JSON 
{
  "statusCode": 422,
  "message": "Unprocessable Entity"
}
````

4. Caso tente desfavoritar um produto que não esteja favoritado

```JSON
{
  "statusCode": 404,
  "message": "Not Found"
}
```

5. Caso tente favoritar um porduto já favoritado

```JSON 
{
  "statusCode": 500,
  "message": "Internal server error"
}
````



## End-point: http://localhost:3333/favs/:product_id
### Descrição: Verifica se produto é favorito 
Method: GET
>```
>http://localhost:3333/favs/:product_id
>```


### 🔑 Autenticação bearer

|Param|value|Type|
|---|---|---|
|token|#token|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: http://localhost:3333/favs/:product_id
### Descrição: Favorita produto
Method: POST
>```
>http://localhost:3333/favs/:product_id
>```


### 🔑 Autenticação bearer

|Param|value|Type|
|---|---|---|
|token|#token|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: http://localhost:3333/favs/:product_id
### Descrição: Desfavorita produto 
Method: DELETE
>```
>http://localhost:3333/favs/:product_id
>```


### 🔑 Autenticação bearer

|Param|value|Type|
|---|---|---|
|token|#token|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: http://localhost:3333/user/register
### Descrição: Registra produto
Method: POST
>```
>http://localhost:3333/user/register
>```
### Body (**raw**)

```json
{
	"username": "teste",
	"password": "teste",
	"email": "proulx@cestoredstore.com"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: http://localhost:3333/user/login
### Descrição: Loga usuário
Method: POST
>```
>http://localhost:3333/user/login
>```
### Body (**raw**)

```json
{
	"username": "teste",
	"password": "teste"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: http://localhost:3333/user/logout
### Descrição: Desloga usuário
Method: POST
>```
>http://localhost:3333/user/logout
>```


### 🔑 Autenticação bearer

|Param|value|Type|
|---|---|---|
|token|#token|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

POSTMAN DOC -> https://documenter.getpostman.com/view/15227236/TzY7dDgE

