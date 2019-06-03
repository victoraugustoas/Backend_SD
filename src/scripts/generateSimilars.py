import json
import sys
import os
import numpy as np

from pprint import pprint

def euclidianDistance(valueA,valueB):
    return (1- abs(valueA - valueB))

# Based on the general coefficient similarity proposed by Gower
def getSimilarity(prodA,prodB):
    
    # Atributos que devem ir para o cálculo de similaridade
    nutrients = [key for key in data[0].keys() if (key != 'name' and key != 'category' and key != '_id')]
    dim = len(nutrients)
    similarity = 0
    sum_mA = dim
    sum_mB = dim

    for nutrient in nutrients:
        mA = 1
        mB = 1
        value_ProdA = prodA[nutrient]['value']
        value_ProdB = prodB[nutrient]['value']
        if(value_ProdA == 'Null' and value_ProdB == 'Null'): 
            mA = 0
            sum_mA -= 1

            mB = 0
            sum_mB -= 1
            continue
        else:
            if(value_ProdA == 'Null'):
                mA = 0
                sum_mA -= 1
                continue
            try:
                if(value_ProdB == 'Null'):
                    mB = 0
                    sum_mB -= 1
                    continue
            except:
                continue

        similarity += round(mA * mB * euclidianDistance(value_ProdA,value_ProdB),2)
                            
    similarity = similarity/max(sum_mA,sum_mB)
    return similarity

def getSimilars(data,prodA,topk=10):
    productsSimilarity = []
    for prodB in data:
        productsSimilarity.append((prodB['_id'],getSimilarity(prodA,prodB)))
    productsSimilarity.sort(key=lambda x: x[1],reverse=True)
    productsSimilarity = productsSimilarity[1:topk]
    
    for i,product in enumerate(productsSimilarity):
        inner = {}
        inner['_id'] = product[0]
        inner['similarity'] = product[1]
        productsSimilarity[i] = inner
    
    return productsSimilarity

def getAllSimilars(data):
    listSimilars = []
    for product in data:
        model = {}
        model['_id'] = product['_id']
        model['similars'] = getSimilars(data,product,10)
        listSimilars.append(model)
    return listSimilars 

if __name__ == "__main__":

    with open(sys.argv[1]) as read_file:
        data = json.load(read_file)

    pathToSave = os.path.normpath(sys.argv[2])

    similars = getAllSimilars(data)

    with open(pathToSave + '/similars.json', "w",encoding='utf8') as write_file:
        json.dump(similars, write_file, ensure_ascii=False)