const Meal = require('../../models/Meal/Meal')
const { validateExistFieldOrError, validateNotExistFieldOrError } = require('../../util/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        let { name, idUser, description, visibility, classification, urlImg, avgEvaluation, ingredients } = req.body

        try {
            validateNotExistFieldOrError(name, `Infome o nome da refeição.`, 400)
            validateNotExistFieldOrError(classification, `Informe a classificação da refeição.`, 400)

            // verifica se usuário é premium
            let findUser = User.findById(id)
            if (!findUser) {
                return res.status(404).send({ msg: `Não foi possível encontrar o usuário.` })
            }

            let newMeal = new Meal({
                name,
                description,
                idUser,
                visibility,
                classification,
                urlImg,
                avgEvaluation,
                ingredients
            })

            if (findUser.isPremium) {
                let saveOk = await newMeal.save()
                if (saveOk) {
                    return res.status(201).send({ msg: `Refeição adicionada com sucesso.` })
                } else {
                    return res.status(500).send({ msg: `Não foi possivel salvar a refeição.` })
                }
            } else {
                res.status(400).send({ msg: `Funcionalidade disponível apenas para usuários premium` })
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

    const getByID = async (req, res) => {
        let { id } = req.params
        try {
            validateNotExistFieldOrError(id, `Informe o id.`, 400)

            let find = await Meal.findById(id)
            if (find) {
                return res.status(200).send(find)
            } else {
                return res.status(404).send({ msg: `Não foi possivel encontrar a refeição.` })
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
        let mealUpdated = req.body
        try {
            validateNotExistFieldOrError(id, `Informe o id para realizar a alteração.`, 400)

            let saveOk = await Meal.findByIdAndUpdate(id, mealUpdated)
            if (saveOk) {
                return res.status(200).send({ msg: `Refeição alterada com sucesso.` })
            } else {
                return res.status(404).send({ msg: `Não foi possível encontrar a refeição.` })
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

    const erase = async (req, res) => {
        let { id } = req.params
        try {
            validateNotExistFieldOrError(id, `Informe o id para realizar a deleção.`, 400)

            let eraseOk = await Meal.findByIdAndDelete(id)
            if (eraseOk) {
                return res.status(200).send({ msg: `Refeição removida com sucesso.` })
            } else {
                return res.status(404).send({ msg: `Não foi possível encontrar a refeição.` })
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

    app.meal = {
        save,
        getByID,
        edit,
        erase
    }
}