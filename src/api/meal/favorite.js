const Favorite = require('../../models/Meal/Favorite')
const User = require('../../models/User')

const { validateExistFieldOrError, validateNotExistFieldOrError } = require('../../util/utils')
module.exports = (app) => {

    const save = async (req, res) => {
        let { idUser, idMeal } = req.query
        try {
            validateNotExistFieldOrError(idUser, `Forneça o id do usuário na query string`, 400)
            validateNotExistFieldOrError(idMeal, `Forneça o id da refeição na query string`, 400)

            // verifica se usuário é premium
            let findUser = User.findById(id)
            if (!findUser) {
                return res.status(404).send({ msg: `Não foi possível encontrar o usuário.` })
            }

            let newFavorite = new Favorite({ idUser, idMeal })

            if (findUser.isPremium) {
                let saveOk = await newFavorite.save()
                if (saveOk) {
                    return res.status(201).send({ msg: `Novo favorito adicionado com sucesso.` })
                } else {
                    return res.status(500).send({ msg: `Não foi possível adicionar o novo favorito.` })
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
    const getByID = async (req, res) => { }
    const erase = async (req, res) => { }

    app.meal.favorite = {
        save,
        getByID,
        erase
    }
}