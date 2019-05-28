# Arquivos de script
## Dependências
- Python

## Como instalar as dependências
Execute no terminal o seguinte comando:

`pip3 install -r requerimentes.txt`

Esse comando é responsável por instalar as dependencias necessárias pra correto funcionamento dos scripts em Python.

## Convenções
1. Os arquivos gerados por scripts deverão ser colocados na pasta `assets/generated`.

## Scripts
- `csvBaseToJSON.py`
  - Para que serve?
    - Converter a base do formato csv para JSON.
  - Como utilizar:
    - O programa requer dois parâmetros passados via linha de comando
    - O primeiro comando diz respeito ao csv em que estão os dados da base, o segundo comando é onde será armazenado o arquivo convertido
    - Ex: `python3 csvBaseToJSON.py ../../assets/Taco_4a_edicao_2011\ -\ CMVCol\ taco3.csv ../../assets/`
  - Execução:
    - A saida do programa será um arquivo chamado `data.json`, e será colocado no caminho especificado como segundo argumento.
- `translateKeysBase.py`
  - Para que serve?
    - Serve para traduzir as chaves da base que estão em português para inglês.
  - Como utilizar:
    - O programa requer três argumentos passados via linha de comando
    - Os argumentos necessários são:
      - A base no formato JSON
      - O arquivo de traduções das chaves
      - O caminho onde será salvo o arquivo gerado.
      - Ex: `python3 translateKeysBase.py ../../assets/generated/data.json ../../assets/traducoes.json ../../assets/generated/`
    - Execução:
      - A saida do programa será um arquivo chamado `translate.json`, e será colocado no caminho especificado nos argumentos.
- `populateDatabase.py`
  - Para que serve?
    - Serve para colocar os documentos da base no banco de dados.
  - Como utilizar:
    - O script necessita de três argumentos passados via linha de comando.
    - Os argumentos são:
      - Password do admin SGBD utilizado
      - Nome do banco de dados que será utilizado para inserção
      - Arquivo que contém os dados a serem lidos e inseridos no banco de dados.
      - Ex: `python3 populateDatabase.py 123 tpf_sd_test ../../assets/generated/translate.json`
    - **Obs: Os documentos inseridos no banco de dados serão colocados dentro da collection chamada `foods`.**
    - Execução:
      - A execução do programa popula a collection no banco de dados