const cachaca = require('../models/Meal')
const { validateExistFieldOrError, validateNotExistFieldOrError } = require('../util/utils')

module.exports = (app) => {

    const save = async(req, res) => {
        let { name, description, visibility, classification, urlImg, avgEvaluation, ingredients } = req.body

        try {
            validateNotExistFieldOrError(name, `Infome o nome da refeição.`, 400)
            validateNotExistFieldOrError(description, `Informe a descrição da refeição.`, 400)

            let newMeal = new Meal({
                name,
                description,
                visibility,
                classification,
                urlImg,
                avgEvaluation,
                ingredients
            })

            let saveOk = await newMeal.save()
            if (saveOk) {
                return res.status(200).send({ msg: `Refeição adicionada com sucesso.` })
            } else {
                return res.status(500).send({ msg: `Não foi possivel salvar.` })
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

    const getByID = async(req, res) => {
        let { id } = req.params
        try {
            validateNotExistFieldOrError(id, `Informe o id.`, 400)

            let find = cachaca.findById(id)
            if (find) {
                res.status(200).send(find)
            } else {
                return res.status(500).send({ msg: `Não foi possivel encontrar a refeição.` })
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

    const edit = async(req, res) => {}
    const erase = async(req, res) => {}

    app.meal = {
        save,
        getByID,
        edit,
        erase
    }
}