const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validateNotExistFieldOrError, validateExistFieldOrError } = require('../util/utils')

module.exports = (app) => {

    const encryptPassword = async (password) => {
        const salt = 10
        let encrypt = await bcrypt.hash(password, salt)
        return encrypt
    }

    const save = async (req, res) => {
        let { name, email, gender, password, dateOfBirth, urlImg, isPremium } = req.body

        try {
            validateNotExistFieldOrError(name, `Informe seu nome.`, 400)
            validateNotExistFieldOrError(email, `Informe seu email.`, 400)
            validateNotExistFieldOrError(gender, `Informe seu sexo.`, 400)
            validateNotExistFieldOrError(password, `Informe seu password.`, 400)
            validateNotExistFieldOrError(dateOfBirth, `Informe sua data de nascimento.`, 400)

            let user = await User.find({ email })
            validateExistFieldOrError(user, `Usuário já cadastrado!`, 409)

            password = await encryptPassword(password)

            user = new User({ name, email, gender, password, dateOfBirth, urlImg, isPremium })

            let saveOk = await user.save()
            if (saveOk) {
                return res.status(201).send({ msg: `Usuário cadastrado com sucesso!` })
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
            let user = await User.findById(id, {
                name: 1,
                email: 1,
                gender: 1,
                dateOfBirth: 1,
                urlImg: 1
            })
            if (user) {
                return res.status(200).send(user)
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    const edit = async (req, res) => {
        let { id } = req.params
        let { name, email, gender, password, dateOfBirth, urlImg, isPremium } = req.body

        try {
            let newUser = { name, email, gender, password, dateOfBirth, urlImg, isPremium }
            let userOk = await User.findByIdAndUpdate(id, newUser)

            if (userOk) {
                return res.status(200).send({ msg: `Usuário alterado com sucesso.` })
            } else {
                validateNotExistFieldOrError(userOk, `ID não encontrado.`, 404)
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
            let userDeleted = await User.findByIdAndDelete(id)
            if (userDeleted) {
                return res.status(200).send({ msg: `Usuário deletado com sucesso.` })
            } else {
                validateNotExistFieldOrError(userDeleted, `ID não encontrado.`, 404)
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

    app.user = {
        save,
        getByID,
        edit,
        erase
    }
}