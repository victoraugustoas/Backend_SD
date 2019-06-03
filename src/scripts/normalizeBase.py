import numpy as np
import pandas as pd
import math
import os
import sys

from collections import defaultdict

def clearBase(df):
    df.replace(['NA','Tr','*'],np.nan,inplace=True)
    df.dropna(thresh=round(df.shape[1]/2),inplace=True)
    cols = list(df.columns[2:])
    df[cols] = df[cols].apply(pd.to_numeric, errors='coerce', axis=1)

def generatePortions(df):
    # Gerar um vetor e coluna com a porção de cada alimento (em g)

    nutrients = list(df.columns[3:])
    nutrients_sum = [column for column in nutrients if(column.split(';')[-1] == 'g' or column.split(';')[-1] == 'mg' )] 
    portions = []

    for i in range(0,df.shape[0]):
        sum_element = 0
        for nutrient in nutrients_sum:
            try:
                value = float(df.iloc[i][nutrient])
            except: continue
            if(not math.isnan(value)):
                if(nutrient.split(';')[1] == 'g'):
                    sum_element += value
                else:
                    sum_element += value/1000
        portions.append(round(sum_element,2))

    df['portions'] = portions

def normalizeByPortion(df,portionBase=50):
    nutrients = list(df.columns[3:])
    # Normalizar dados para uma porção X g
    portion_base = 50 # em g

    def normalizePortion(nutrient,portion):

        if(not math.isnan(nutrient)):
            return round((nutrient * portion_base / portion),3)
        else:
            return nutrient   

    for nutrient in nutrients:
        df[nutrient] = df.apply(lambda row: normalizePortion(row[nutrient], row['portions']),axis=1)

def normalizeByMax(df):
    # Obter as categorias e nutrientes da base
    categories = list(df['category'].value_counts().index)
    nutrients = list(df.columns[2:])

    # Cria dicionário para o valor máximo de cada nutriente, por categoria.
    dictCN = defaultdict(dict)
    for categorie in categories:
        for nutrient in nutrients:
            dictCN[categorie][nutrient] = df[df['category'] == categorie][nutrient].max()
            
    # Normalizar dados com base no maior da categoria

    def normalizeMax(category,nutrient_value,portion,nutrient):

        if(not math.isnan(nutrient_value)):
            return round((nutrient_value / dictCN[category][nutrient]),3)
        else:
            return nutrient_value  

    for nutrient in nutrients:
        df[nutrient] = df.apply(lambda row: normalizeMax(row['category'],row[nutrient],row['portions'],nutrient),axis=1)

if __name__ == '__main__':

    df = pd.read_csv(sys.argv[1])
    pathToSave = os.path.normpath(sys.argv[2])

    clearBase(df)
    generatePortions(df)
    normalizeByPortion(df,50)
    normalizeByMax(df)
    df.drop('portions',axis=1,inplace=True)
    df.fillna('Null',inplace=True)

    df.to_csv(pathToSave + '/' + (sys.argv[1].split('/')[-1])[:-4] + '_new.csv',index=False)