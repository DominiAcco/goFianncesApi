#  goFinances API

API Node.js com PostgreSQL para gerenciar transações financeiras , como entradas e saídas de dinheiro.Está api esta conectada as versoes web e mobile do aplicativo.

//a tabela utilizada no banco dedoa esta no arquivo tabela.sql juntoa aguns inserts para testes 
##  Como usar

1. **Clone o repositório** e instale as dependências:

```bash
git clone  https://github.com/DominiAcco/goFianncesApi
git checkout apiFinal
npm i
// execute a api
node app.js

//crie o arquivo env
//Exemplo
DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=goFinances 
