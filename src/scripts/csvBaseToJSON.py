import csv
import sys
import json
import os
from pprint import pprint

arg = sys.argv[1]
pathToSave = os.path.normpath(sys.argv[2])
arq2 = open(pathToSave + '/data.json', 'w')

obj = {}

with open(arg) as arq:
    reader = csv.DictReader(arq)
    for field in reader.fieldnames:
        fieldname = field.split(';')
        if (len(fieldname) > 1):
            obj[fieldname[0]] = {
                'value': '',
                'type': fieldname[1]
            }
        else:
            obj[fieldname[0]] = {
                'value': ''
            }

x = []

with open(arg) as arq:
    reader = csv.DictReader(arq)
    for row in reader:
        for field in reader.fieldnames:
            fieldname = field.split(';')
            try:
                value = float(row[field])
            except:
                value = row[field]

            if (len(fieldname) > 1):
                obj[fieldname[0]] = {
                    'value': value,
                    'type': fieldname[1]
                }
            else:
                # normaliza o nome dos alimentos
                value = value.replace(',', '').lower()
                obj[fieldname[0]] = {
                    'value': value
                }
        x.append(str(json.loads(json.dumps(obj))).replace('\'', '\"'))
    arq2.write(str(x).replace('\'', ''))
