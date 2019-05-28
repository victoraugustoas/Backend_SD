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
    }

    const edit = async (req, res) => {

    }

    const erase = async (req, res) => {

    }

    app.food = {
        save,
        getByID,
        edit,
        erase
    }
}