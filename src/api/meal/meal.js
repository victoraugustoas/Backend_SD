const Meal = require('../../models/Meal/Meal')
const Evaluate = require('../../models/Meal/Evaluate')
const jaroWinkler = require('jaro-winkler')
const { validateExistFieldOrError, validateNotExistFieldOrError, validateUserNotPremium } = require('../../util/utils')

module.exports = (app) => {

    const save = async (req, res) => {

        try {
            // caso a requisição contenha o campo meal, então ela é proveniente do frontend android
            if (req.body.meal) {
                req.body = JSON.parse(req.body.meal)
            }

            let { name, description, visibility, classification, urlImg, avgEvaluation, ingredients } = req.body
            let image = null

            // converte em JSON caso ainda seja string
            if (typeof ingredients == "string") {
                ingredients = JSON.parse(ingredients)
            }

            validateNotExistFieldOrError(name, `Infome o nome da refeição.`, 400)
            validateNotExistFieldOrError(classification, `Informe a classificação da refeição.`, 400)

            if (!ingredients) return res.status(400).send({ msg: `Informe pelo menos um alimento.` })

            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)
            let idUser = req.user._id

            if (req.file != undefined) {
                // envia a imagem para a cdn
                image = await new Promise((resolve, reject) => {
                    app.cloudinary.uploader.upload(req.file.path, (err, url) => {
                        if (err) return reject(err);
                        resolve(url);
                    })
                })
            } else {
                // imagem padrão
                image = {
                    secure_url: `https://res.cloudinary.com/cdncloudnuvem/image/upload/v1561059934/meal_oanr0n.png`
                }
            }

            let newMeal = new Meal({
                name,
                description,
                idUser,
                visibility,
                classification,
                urlImg: image.secure_url,
                avgEvaluation,
                ingredients
            })

            let saveOk = await newMeal.save()
            if (saveOk) {
                return res.status(201).send({ msg: `Refeição adicionada com sucesso.` })
            } else {
                return res.status(500).send({ msg: `Não foi possivel salvar a refeição.` })
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
        try {
            let { id } = req.params
            let mealUpdated = req.body

            validateNotExistFieldOrError(id, `Informe o id para realizar a alteração.`, 400)

            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)

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
        try {
            let { id } = req.params

            validateNotExistFieldOrError(id, `Informe o id para realizar a deleção.`, 400)

            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)

            let eraseOk = await Meal.findByIdAndDelete(id)
            let { urlImg } = eraseOk

            if (eraseOk) {
                let idImg = String(urlImg).split("upload/")[1].split('/')[1].split(".jpg")[0]
                image = await new Promise((resolve, reject) => {
                    app.cloudinary.uploader.destroy(idImg, (err, url) => {
                        if (err) return reject(err);
                        resolve(url);
                    })
                })

                if (image) {
                    return res.status(200).send({ msg: `Refeição removida com sucesso.` })
                }
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

    const listAllUser = async (req, res) => {
        try {
            const user = req.user
            let mealsUser = await Meal.find({ idUser: user._id })

            validateUserNotPremium(req.user, `Funcionalidade disponível apenas para usuários premium.`, 403)

            if (mealsUser) {
                return res.status(200).send(mealsUser)
            } else {
                return res.status(404).send({ msg: `Não foi possível encontrar o usuário!` })
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

    const listAll = async (req, res) => {
        try {
            let meals = await Meal.find({ visibility: true }) // recupera as refeições públicas

            if (meals) {
                return res.status(200).send(meals)
            } else {
                return res.status(404).send({ msg: `Não foi possível encontrar o usuário!` })
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

    const searchByName = async (req, res) => {
        try {
            let { name, category } = req.query
            let distance = []

            let seachOk = await Meal.find({ classification: category })

            // calcula a similaridade para todos os documentos presentes na base
            seachOk.forEach((ele) => {
                let aux = {
                    similarity: 0,
                    data: null
                }

                // similaridade de strings utilizando jaro-winkler
                aux.similarity = jaroWinkler(name, ele.name)
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

            return res.status(200).send(distance)

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

    const updateAvg = async () => {
        console.log('running update average evaluations for meals')
        let meals = await Meal.find()

        for (let i = 0; i < meals.length; i++) {
            let meal = meals[i]
            let avg = 0

            let evaluations = await Evaluate.find({ mealID: meal._id })

            if (evaluations.length > 0) {
                for (let j = 0; j < evaluations.length; j++) {
                    avg += evaluations[j].evaluation
                }
                avg = avg / evaluations.length
            }
            let update = await Meal.findByIdAndUpdate(meal._id, { avgEvaluation: avg })
        }
    }

    app.meal = {
        save,
        getByID,
        edit,
        erase,
        listAllUser,
        listAll,
        searchByName,
        updateAvg
    }
}