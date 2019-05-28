import json
import sys
import os
from pprint import pprint

data = sys.argv[1]  # arquivo da base
translateJson = sys.argv[2]  # arquivo com as traduções
# local onde o arquivo de traduzido ficará
translatedFile = os.path.normpath(sys.argv[3])

# carrega as traduções
translate = None
with open(translateJson) as jsonFile:
    translate = json.load(jsonFile)

# carrega a base
with open(data) as data:
    data = json.load(data)


def getItem(name, lang='pt'):
    for item in translate:
        if (item[lang] == name):
            return item


# traduz a base
translatedBase = []
for food in data:
    x = {}
    for key in food.keys():
        x[getItem(key)['en']] = food[key]
    translatedBase.append(x)

# salva a tradução no arquivo
with open(translatedFile + '/translate.json', 'w') as translateFile:
    json.dump(translatedBase, translateFile)
