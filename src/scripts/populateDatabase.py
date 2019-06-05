import pymongo
from bson.objectid import ObjectId
import sys
import json

password = sys.argv[1]
database = sys.argv[2]
data = sys.argv[3]
collection = sys.argv[4]
try:
    similars = bool(sys.argv[5])
except:
    similars = False
    
try:
    local = bool(sys.argv[6])
except:
    local = False

if (local):
    client = pymongo.MongoClient("mongodb://localhost:27017")
else:
    client = pymongo.MongoClient(
        "mongodb+srv://adm_sd:%s@mongodbatlas-ymqp4.mongodb.net/test?retryWrites=true" % (password))

db = client[database]  # acessa o banco de dados

# acessa a coleção foods dentro desse banco de dados
collection = db[collection]

documents = None
with open(data) as arq:
    documents = json.load(arq)

if(similars):
    for doc in documents:
        doc['_id'] = ObjectId(doc['_id'])
        for docInner in doc['similars']:
            docInner['_id'] = ObjectId(docInner['_id'])

collection.insert_many(documents)
