const Favorite = require('../../models/Meal/Favorite')
const Meal = require('../../models/Meal/Meal')
const User = require('../../models/User')

const { validateExistFieldOrError, validateNotExistFieldOrError, validateUserNotPremium } = require('../../util/utils')
module.exports = (app) => {

    const save = async (req, res) => {
        try {
            let { idMeal } = req.body
            validateNotExistFieldOrError(idMeal, `Forneça o id da refeição.`, 400)

            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)
            let idUser = req.user._id

            let verifyFavorite = await Favorite.findOne({ idUser, idMeal })
            console.log(!!verifyFavorite)
            validateExistFieldOrError(verifyFavorite, `Não é possível favoritar novamente a mesma refeição`, 400)

            let newFavorite = new Favorite({ idUser, idMeal })

            let saveOk = await newFavorite.save()
            if (saveOk) {
                return res.status(201).send({ msg: `Novo favorito adicionado com sucesso.` })
            } else {
                return res.status(500).send({ msg: `Não foi possível adicionar o novo favorito.` })
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
        try {
            let { id } = req.params
            validateNotExistFieldOrError(id, `Forneça o id da refeição.`, 400)
            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)

            let favorite = await Favorite.findOne({ idUser: req.user._id, idMeal: id })
            if (!favorite) return res.status(404).send({ msg: `Favorito não encontrado.` })

            let food = await Meal.findById(favorite.idMeal)
            if (food) {
                return res.status(200).send(food)
            } else {
                return res.status(404).send({ msg: `Refeição não encontrada.` })
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
        try {
            let { id } = req.params
            validateNotExistFieldOrError(id, `Forneça o id da refeição.`, 400)
            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)

            let eraseOk = await Favorite.findOne({ idMeal: id, idUser: req.user._id })

            if (eraseOk) {
                return res.status(200).send({ msg: `Favorito removido com sucesso.` })
            } else {
                return res.status(404).send({ msg: `Favorito não encontrado.` })
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

    const listAll = async (req, res) => {
        try {
            let resp = []
            let allFav = await Favorite.find({ idUser: req.user._id })

            for (let fav of allFav) {
                let meal = await Meal.findById(fav.idMeal)
                let userCreator = await User.findById(meal.idUser)
                let { name, classification, urlImg } = meal

                resp.push({
                    name, classification, urlImg,
                    idMeal: meal._id,
                    creator: userCreator.name
                })
            }
            return res.status(200).send(resp)
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

    app.meal.favorite = {
        save,
        getByID,
        erase,
        listAll
    }
}