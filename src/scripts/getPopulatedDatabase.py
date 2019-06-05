import pymongo
import sys
import json
import os
from bson.objectid import ObjectId
from pprint import pprint

password = sys.argv[1]
database = sys.argv[2]
pathToSave = os.path.normpath(sys.argv[3])
collection = sys.argv[4]
try:
    local = bool(sys.argv[5])
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

documents = list(collection.find())

for doc in documents:
    doc['_id'] = str(doc['_id'])

with open(pathToSave+'/getDatabase.json', 'w') as arq:
    json.dump(documents, arq)
