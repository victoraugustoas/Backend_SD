# Backend - TPF SD
## Dependencias necessárias
- NodeJS
- Yarn ou NPM

## Organização da estrutura do projeto
- `/` : contém os arquivos principais de configuração do backend.
- `/assets`: contém arquivos estáticos utilizados na aplicação.
- `/src`: contém os códigos fonte de toda a aplicação.
- `/src/api`: contém os códigos que serão utilizados para que o backend funcione.
- `/src/config`: contém arquivos de configuração do backend, como o banco de dados, middlewares e rotas.
- `/src/models`: contém os models do sistema.
- `/src/scripts`: scripts úteis para processamento offline.
- `/src/util`: funções utilitárias.

## Como executar
Para executar, basta abrir um terminal na raiz do projeto e executar o comando `npm run dev` para que seja iniciado no modo de desenvolvimento.

É necessário que o arquivo `.env` esteja presente com as configurações necessárias. **Obs: Há um arquivo de exemplo para isso `.env.example`.**

### Implementação
### Rotas
- Usuário

| Método | Rota      | Função                      | Parâmetros |
| :----- | :-------- | :-------------------------- | :--------- |
| POST   | /user     | Cadastra um usuário         |            |
| GET    | /user/:id | Retorna os dados do usuário | ID         |
| PUT    | /user/:id | Altera os dados do usuário  | ID         |
| Delete | /user/:id | Apaga o usuário do sistema  | ID         |

- Alimentos
  
| Método | Rota                   | Função                                                                         | Parâmetros                  |
| :----- | :--------------------- | :----------------------------------------------------------------------------- | :-------------------------- |
| POST   | /food                  | Cadastra um novo alimento                                                      |                             |
| GET    | /food/:id              | Retorna os dados do alimento                                                   | ID                          |
| PUT    | /food/:id              | Altera os dados do alimento                                                    | ID                          |
| DELETE | /food/:id              | Remove o alimento do sitema                                                    | ID                          |
| GET    | /food/search/nutrient/ | Retorna a lista de alimentos conforme os parâmetros fornecidos na query string | nutrient; sort; limit; page |