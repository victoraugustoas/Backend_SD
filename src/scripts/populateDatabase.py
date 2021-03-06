import pymongo
from bson.objectid import ObjectId
import sys
import json

password = sys.argv[1]
database = sys.argv[2]
data = sys.argv[3]
collection = sys.argv[4]
try:
    if(sys.argv[5] == 'true'):
        similars = True
    else:
        similars = False
except:
    similars = False

try:
    if(sys.argv[6] == 'true'):
        local = True
    else:
        local = False
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
        try:
            for docInner in doc['similars']:
                docInner['_id'] = ObjectId(docInner['_id'])
        except:
            pass

collection.insert_many(documents)
