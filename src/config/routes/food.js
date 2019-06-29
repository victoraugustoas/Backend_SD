const express = require('express')
const router = express.Router()

module.exports = (app) => {

    // CRUD
    router.post('/', app.auth.authenticate(), app.food.save)
    /**
     * 
     * @api {get} /food/:id Informações do alimento e similares
     * @apiGroup Food
     * 
     * @apiHeader  (HeaderParams) {Token} Authorization Token de autenticação
     * @apiParam (URLParams) {ObjectID} ID ID do alimento
     * 
     * @apiSuccess (Sucess 200) {Object} food Alimento com os nutrientes, usuários premium e free
     * @apiSuccess (Sucess 200) {Object[]} lstSimilars Array com alimentos similares ao atributo food, somente para usuários premium
     * 
     * @apiParamExample  {URL Params} Request-Example:
     * /food/5cf845fe245413a64b405024
     * 
     * 
     * @apiSuccessExample {json} Success-Response (Usuário Free):
     * {
    "name": {
        "value": "queijo requeijão cremoso"
    },
    "category": {
        "value": "leite e derivados"
    },
    "energy": {
        "value": 1382.239,
        "type": "Kj"
    },
    "humidity": {
        "value": 62.5,
        "type": "%"
    },
    "protein": {
        "value": 12.355,
        "type": "g"
    },
    "lipids": {
        "value": 30.116,
        "type": "g"
    },
    "carbohydrate": {
        "value": 3.089,
        "type": "g"
    }
}
     * 
     * @apiSuccessExample {json} Success-Response (Usuário Premium):
     * {
    "food": {
        "humidity": {
            "value": 62.5,
            "type": "%"
        },
        "energy": {
            "value": 1382.239,
            "type": "Kj"
        },
        "protein": {
            "value": 12.355,
            "type": "g"
        },
        "lipids": {
            "value": 30.116,
            "type": "g"
        },
        "cholesterol": {
            "value": 95.238,
            "type": "mg"
        },
        "carbohydrate": {
            "value": 3.089,
            "type": "g"
        },
        "food fiber": {
            "value": "Null",
            "type": "g"
        },
        "ashes": {
            "value": 2.574,
            "type": "g"
        },
        "calcium": {
            "value": 333.333,
            "type": "mg"
        },
        "magnesium": {
            "value": 15.444,
            "type": "mg"
        },
        "manganese": {
            "value": 0.026,
            "type": "mg"
        },
        "phosphorus": {
            "value": 576.577,
            "type": "mg"
        },
        "iron": {
            "value": 0.129,
            "type": "mg"
        },
        "sodium": {
            "value": 718.147,
            "type": "mg"
        },
        "potassium": {
            "value": 119.691,
            "type": "mg"
        },
        "copper": {
            "value": 0.064,
            "type": "mg"
        },
        "zinc": {
            "value": 1.673,
            "type": "mg"
        },
        "retinol": {
            "value": 250.965,
            "type": "mcg"
        },
        "re": {
            "value": "Null",
            "type": "mcg"
        },
        "rae": {
            "value": "Null",
            "type": "mcg"
        },
        "thiamine": {
            "value": "Null",
            "type": "mg"
        },
        "riboflavin": {
            "value": 0.245,
            "type": "mg"
        },
        "pyridoxine": {
            "value": "Null",
            "type": "mg"
        },
        "niacin": {
            "value": "Null",
            "type": "mg"
        },
        "vitamin c": {
            "value": "Null",
            "type": "mg"
        },
        "_id": "5cf845fe245413a64b405024",
        "name": {
            "value": "queijo requeijão cremoso"
        },
        "category": {
            "value": "leite e derivados"
        }
    },
    "lstSimilars": [...]
}
     */
    router.get('/:id', app.auth.authenticate(), app.food.getByID)
    router.put('/:id', app.auth.authenticate(), app.food.edit)
    router.delete('/:id', app.auth.authenticate(), app.food.erase)

    // Buscas
    /**
     * 
     * @api {get} /food/search/nutrient/ Ranking de alimentos para determinado nutriente
     * @apiGroup Food
     * @apiHeader (HeaderParams) {Token} Authorization Token de autenticação
     * 
     * 
     * @apiParam (QueryStringParams) {String} nutrient Nome do nutriente
     * @apiParam (QueryStringParams) {String} sort Podendo variar entre (asc, desc)
     * @apiParam (QueryStringParams) {Int} limit Limite de documentos a ser retornado
     * @apiParam (QueryStringParams) {Int} page Número da página a ser retornada na paginação
     * 
     * @apiSuccess (Sucess 200) {Int} page Diz a página atual retornada pela paginação
     * @apiSuccess (Sucess 200) {Int} limit Limite de documentos presentes em data
     * @apiSuccess (Sucess 200) {Object[]} data Array de alimentos
     * 
     * @apiParamExample  {Query String} Request-Example:
     * /food/search/nutrient/?nutrient=lipids&sort=desc&limit=5&page=2
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
    "page": 2,
    "limit": 2,
    "data": [...]
}
     */
    router.get('/search/nutrient/', app.auth.authenticate(), app.food.searchByNutrient)
    /**
     * 
     * @api {post} /food/search/name/ Busca por nome de alimento
     * @apiDescription Array de alimentos que casam com a string
     * @apiGroup Food
     * 
     * @apiHeader  (HeaderParams) {Token} Authorization Token de autenticação
     * @apiParam (BodyParams) {String} name Nome do alimento a ser buscado
     * 
     * 
     * @apiParamExample  {Body Params} Request-Example:
     * {
     *     "name" : "arroz"
     * }
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * [
    {
        "name": {
            "value": "arroz integral cozido"
        },
        "category": {
            "value": "cereais e derivados"
        },
        "energy": {
            "value": 786.91,
            "type": "Kj"
        },
        "humidity": {
            "value": 70.1,
            "type": "%"
        },
        "protein": {
            "value": 3.957,
            "type": "g"
        },
        "lipids": {
            "value": 1.522,
            "type": "g"
        },
        "carbohydrate": {
            "value": 39.269,
            "type": "g"
        }
    },
    {
        "name": {
            "value": "noz crua"
        },
        "category": {
            "value": "leguminosas e derivados"
        },
        "energy": {
            "value": 1267.84,
            "type": "Kj"
        },
        "humidity": {
            "value": 6.2,
            "type": "%"
        },
        "protein": {
            "value": 6.843,
            "type": "g"
        },
        "lipids": {
            "value": 29.032,
            "type": "g"
        },
        "carbohydrate": {
            "value": 8.993,
            "type": "g"
        }
    }
]
     * 
     * 
     */
    router.post('/search/name/', app.auth.authenticate(), app.food.searchByName)

    router.put('/addView/:id', app.auth.authenticate(), app.food.addView)

    app.use('/food', router)
}