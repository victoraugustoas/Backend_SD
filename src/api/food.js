const Food = require('../models/Food')
const { validateNotExistFieldOrError, validateExistFieldOrError } = require('../util/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        let { name, category } = req.body
        let bodyFood = { ...req.body }
        console.log(bodyFood)

        try {
            validateNotExistFieldOrError(name, `Informe o nome do alimento.`, 400)
            validateNotExistFieldOrError(category, `Informe o nome do alimento.`, 400)

            let food = new Food(bodyFood)
            console.log(food)
            let saveOk = await food.save()
            if (saveOk) {
                return res.status(201).send({ msg: `Alimento adicionado com sucesso.` })
            }
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                return res.status(500).send(error)
            }
        }
    }

    const getByID = async (req, res) => {
        let { id } = req.params
        try {
            let food = await Food.findById(id)
            if (food) {
                return res.status(200).send(food)
            } else {
                return res.status(404).send({ msg: `Alimento nao encontrado` })
            }
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                return res.status(500).send(error)
            }
        }
    }

    const edit = async (req, res) => {
        let { id } = req.params
        let bodyFood = { ...req.body }
        try {
            let food = await Food.findByIdAndUpdate(id, bodyFood)

            if (food) {
                return res.status(200).send({ msg: `Alimento alterado com sucesso.` })
            } else {
                validateNotExistFieldOrError(food, `Alimento não pode ser alterado ou não existe.`, 404)
            }
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                return res.status(500).send(error)
            }
        }
    }

    const erase = async (req, res) => {
        let { id } = req.params
        try {
            let food = await Food.findByIdAndRemove(id)

            if (food) {
                return res.status(200).send({ msg: `Alimento removido com sucesso.` })
            } else {
                return res.status(404).send({ msg: `Alimento nao encontrado` })
            }
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                return res.status(500).send(error)
            }
        }
    }

    const searchByNutrient = async (req, res) => {
        let nutrient = req.query.nutrient
        let sortBy = req.query.sort
        let limit = parseInt(req.query.limit)
        let page = parseInt(req.query.page)

        try {
            validateNotExistFieldOrError(nutrient, `Informe o nutriente na query string.`, 400)
            validateNotExistFieldOrError(sortBy, `Informe a direção da ordenação na query string.`, 400)
            validateNotExistFieldOrError(limit, `Informe o limite de documentos na query string.`, 400)
            validateNotExistFieldOrError(page, `Informe a página na query string.`, 400)

            let nutrientValue = `${nutrient}.value`

            let sortParams = {}
            // constroi o seguinte objeto { nutrient.value: asc }
            sortParams[nutrientValue] = sortBy


            let query = {}
            // filtra somente os documentos cujo o valor do nutriente é um número
            query[nutrientValue] = { $type: 'number' }

            let foods = await Food.find(query)
                .setOptions({
                    skip: page * limit,
                    limit,
                    sort: sortParams
                })
                .exec()

            let result = {
                page,
                limit,
                data: foods
            }

            res.status(200).send(result)
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                return res.status(500).send(error)
            }
        }
    }

    const searchByName = async (req, res) => {
        res.send('funcionando ...')
    }

    app.food = {
        save,
        getByID,
        edit,
        erase,
        searchByNutrient,
        searchByName
    }
}