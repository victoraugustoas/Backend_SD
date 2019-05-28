import pymongo
import sys
import json

password = sys.argv[1]
database = sys.argv[2]
data = sys.argv[3]

client = pymongo.MongoClient(
    "mongodb+srv://adm_sd:%s@mongodbatlas-ymqp4.mongodb.net/test?retryWrites=true" % (password))

db = client[database]  # acessa o banco de dados
collection = db['foods']  # acessa a coleção foods dentro desse banco de dados

documents = None
with open(data) as arq:
    documents = json.load(arq)

collection.insert_many(documents)
