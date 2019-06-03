import pymongo
from bson.objectid import ObjectId
import sys
import json

password = sys.argv[1]
database = sys.argv[2]
data = sys.argv[3]
try:
    local = bool(sys.argv[4])
except:
    local = False

if (local):
    client = pymongo.MongoClient("mongodb://localhost:27017")
else:
    client = pymongo.MongoClient(
        "mongodb+srv://adm_sd:%s@mongodbatlas-ymqp4.mongodb.net/test?retryWrites=true" % (password))

db = client[database]  # acessa o banco de dados
collection = db['foods']  # acessa a coleção foods dentro desse banco de dados

documents = None
with open(data) as arq:
    documents = json.load(arq)

if(local):
    for doc in documents:
        doc['_id'] = ObjectId(doc['_id'])

collection.insert_many(documents)
