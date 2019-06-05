#!/bin/bash

password=`cat password_db.txt`

python3 normalizeBase.py ../../assets/Taco_4a_edicao_2011\ -\ CMVCol\ taco3.csv ../../assets/generated/

python3 csvBaseToJSON.py ../../assets/generated/Taco_4a_edicao_2011\ -\ CMVCol\ taco3_new.csv ../../assets/generated/

python3 translateKeysBase.py ../../assets/generated/data.json ../../assets/traducoes.json ../../assets/generated/

python3 populateDatabase.py $password tpf_sd_test ../../assets/generated/translate.json foods true

python3 csvBaseToJSON.py ../../assets/generated/Taco_4a_edicao_2011\ -\ CMVCol\ taco3_similarity.csv ../../assets/generated/

python3 translateKeysBase.py ../../assets/generated/data.json ../../assets/traducoes.json ../../assets/generated/

python3 populateDatabase.py $password tpf_sd_test ../../assets/generated/translate.json foods_normalized true

python3 generateSimilars.py ../../assets/generated/translate.json ../../assets/generated/

python3 populateDatabase.py $password tpf_sd_test ../../assets/generated/similars.json similars true