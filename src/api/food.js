const Food = require('../models/Food')
const Similars = require('../models/Similars')
const jaroWinkler = require('jaro-winkler')
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

    const getSimilars = async (id) => {
        let similars = await Similars.findById(id)

        let lstSimilars = []
        for (let i = 0; i < similars['similars'].length; i++) {
            let ele = similars['similars'][i]
            let aux = await Food.findById(ele._id)
            lstSimilars.push(aux)
        }

        return lstSimilars
    }

    const getByID = async (req, res) => {
        try {
            let { id } = req.params
            let food = await Food.findById(id)

            if (!food) return res.status(404).send({ msg: `Alimento nao encontrado` })

            if (req.user.isPremium) {
                let lstSimilars = await getSimilars(id)
                if (lstSimilars) {
                    return res.status(200).send({ food, lstSimilars })
                }
            } else {
                // Caso o usuário não seja premium
                return res.status(200).send(getNutrientsNotPremium(food))
            }
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
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

    const getNutrientsNotPremium = (food) => {
        let { _id, name, category, energy, humidity, protein, lipids, carbohydrate } = food
        let notPremium = { _id, name, category, energy, humidity, protein, lipids, carbohydrate }
        return notPremium
    }

    const searchByNutrient = async (req, res) => {
        try {
            let nutrient = req.query.nutrient
            let sortBy = req.query.sort
            let limit = parseInt(req.query.limit)
            let page = parseInt(req.query.page)

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

            let result = {}

            if (req.user.isPremium) {
                result = {
                    page,
                    limit,
                    data: foods
                }
            } else {
                foods = foods.map((ele) => {
                    return getNutrientsNotPremium(ele)
                })
                result = {
                    page, limit, data: foods
                }
            }

            res.status(200).send(result)
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
                return res.status(500).send(error)
            }
        }
    }

    let documents = null

    const searchByName = async (req, res) => {
        try {
            let { name } = req.body
            let distance = []

            validateNotExistFieldOrError(name, `Informe o nome do alimento.`, 400)

            if (documents == null) {
                documents = await Food.find()
            }

            // calcula a similaridade para todos os documentos presentes na base
            documents.forEach((ele) => {
                let aux = {
                    similarity: 0,
                    data: null
                }

                // similaridade de strings utilizando jaro-winkler
                aux.similarity = jaroWinkler(name, ele.name.value)
                aux.data = ele

                distance.push(aux)
            })

            // ordena os elementos de acordo com sua similaridade
            let ordened = distance.sort((a, b) => {
                a = a.similarity
                b = b.similarity
                return b - a
            })

            distance = ordened.slice(0, 9)
            distance = distance.map((ele) => {
                return ele.data
            })

            if (!req.user.isPremium) {
                distance = distance.map((ele) => {
                    return getNutrientsNotPremium(ele)
                })
            }

            return res.status(200).send(distance)
        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
                return res.status(500).send(error)
            }
        }
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