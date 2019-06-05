#!/bin/bash

python3 normalizeBase.py ../../assets/Taco_4a_edicao_2011\ -\ CMVCol\ taco3.csv ../../assets/generated/

python3 csvBaseToJSON.py ../../assets/generated/Taco_4a_edicao_2011\ -\ CMVCol\ taco3_new.csv ../../assets/generated/

python3 translateKeysBase.py ../../assets/generated/data.json ../../assets/traducoes.json ../../assets/generated/

python3 populateDatabase.py Ly3CCtFC9lJ7Uj3I tpf_sd_test ../../assets/generated/translate.json foods

python3 csvBaseToJSON.py ../../assets/generated/Taco_4a_edicao_2011\ -\ CMVCol\ taco3_new.csv ../../assets/generated/

python3 translateKeysBase.py ../../assets/generated/data.json ../../assets/traducoes.json ../../assets/generated/

python3 populateDatabase.py Ly3CCtFC9lJ7Uj3I tpf_sd_test ../../assets/generated/translate.json foods_normalized

python3 getPopulatedDatabase.py Ly3CCtFC9lJ7Uj3I tpf_sd_test ../../assets/generated/ foods_normalized

python3 generateSimilars.py ../../assets/generated/getDatabase.json ../../assets/generated/

python3 populateDatabase.py Ly3CCtFC9lJ7Uj3I tpf_sd_test ../../assets/generated/similars.json similars true 