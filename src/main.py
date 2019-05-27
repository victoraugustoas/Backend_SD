import csv
import sys
import json
from pprint import pprint

arg = sys.argv[1]
arq2 = open('data.json', 'w')

x = []

with open(arg) as arq:
    reader = csv.DictReader(arq)
    for row in reader:
        x.append(str(json.loads(json.dumps(row))).replace('\'', '\"'))
    arq2.write(str(x).replace('\'', ''))