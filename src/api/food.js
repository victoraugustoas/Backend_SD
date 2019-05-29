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

    app.food = {
        save,
        getByID,
        edit,
        erase
    }
}