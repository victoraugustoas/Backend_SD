const User = require('../models/User')
const { validateNotExistFieldOrError, validateExistFieldOrError } = require('../util/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        let { name, email, gender, password, dateOfBirth, urlImg } = req.body

        try {
            validateNotExistFieldOrError(name, `Informe seu nome.`)
            validateNotExistFieldOrError(email, `Informe seu email.`)
            validateNotExistFieldOrError(gender, `Informe seu sexo.`)
            validateNotExistFieldOrError(password, `Informe seu password.`)
            validateNotExistFieldOrError(dateOfBirth, `Informe sua data de nascimento.`)

            let user = await User.find({ email })
            validateExistFieldOrError(user, `Usuário já cadastrado!`)

            user = new User({ name, email, gender, password, dateOfBirth })

            let saveOk = await user.save()
            if (saveOk) {
                return res.status(200).send({ msg: `Usuário cadastrado com sucesso!` })
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    app.user = {
        save
    }
}