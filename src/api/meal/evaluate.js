const Meal = require('../../models/Meal/Meal')
const Evaluate = require('../../models/Meal/Evaluate')
const { validateExistFieldOrError, validateNotExistFieldOrError, validateUserNotPremium } = require('../../util/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        try {
            let { mealID, evaluation } = req.body
            const user = req.user

            validateNotExistFieldOrError(evaluation, `Informe um valor entre 0 e 5 para avaliação`, 400)
            validateNotExistFieldOrError(mealID, `Informe o ID da refeição a ser avaliada`, 400)

            let verify = await Evaluate.findOne({ userID: user._id, mealID })
            validateExistFieldOrError(verify, `Não é possível avaliar 2 vezes a mesma refeição!`, 400)

            let newEvaluation = new Evaluate({
                evaluation,
                mealID,
                userID: user._id
            })

            let saveOk = await newEvaluation.save()
            if (saveOk) {
                return res.status(201).send({ msg: `Avaliação adicionada com sucesso.` })
            } else {
                return res.status(500).send({ msg: `Não foi possivel salvar a avaliação.` })
            }

        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
                return res.status(500).send(String(error))
            }
        }
    }

    const edit = async (req, res) => {
        try {
            let { id } = req.params
            let { evaluation } = req.body
            const user = req.user
            console.log(user._id)

            validateNotExistFieldOrError(id, `Informe o ID do favorito a ser modificado`, 400)
            validateNotExistFieldOrError(evaluation, `Informe um valor entre 0 e 5 para avaliação`, 400)

            let editOk = await Evaluate.findByIdAndUpdate(id, { evaluation })

            if (editOk) {
                return res.status(201).send({ msg: `Avaliação alterada com sucesso.` })
            } else {
                return res.status(500).send({ msg: `Não foi possivel alterar a avaliação.` })
            }

        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
                return res.status(500).send(String(error))
            }
        }
    }

    const getByID = async (req, res) => {
        try {
            let { mealID } = req.params
            const { user } = req

            validateNotExistFieldOrError(mealID, `Informe o ID da refeição a ser avaliada`, 400)

            let evaluation = await Evaluate.findOne({ userID: user._id, mealID })

            if (evaluation) {
                return res.status(200).send(evaluation)
            } else {
                return res.status(404).send({ msg: `Não foi possivel encontrar a avaliação.` })
            }

        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
                return res.status(500).send(String(error))
            }
        }
    }

    const erase = async (req, res) => {
        try {
            let { id } = req.params

            validateNotExistFieldOrError(id, `Informe o ID da avaliação a ser apagada`, 400)

            let eraseOk = Evaluate.findByIdAndDelete(id)

            if (eraseOk) {
                return res.status(200).send({ msg: `Avaliação removida com sucesso!` })
            } else {
                return res.status(404).send({ msg: `Não foi possível encontrar o favorito!` })
            }

        } catch (error) {
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                console.log(error)
                return res.status(500).send(String(error))
            }
        }
    }

    app.meal.evaluate = {
        save,
        edit,
        getByID,
        erase
    }
}