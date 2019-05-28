const User = require('../models/User')
const { validateFieldOrError } = require('../util/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        let { name, email, gender, password, dateOfBirth } = req.body

        try {
            validateFieldOrError(name, `Informe seu nome.`)
            validateFieldOrError(email, `Informe seu email.`)
            validateFieldOrError(gender, `Informe seu sexo.`)
            validateFieldOrError(password, `Informe seu password.`)
            validateFieldOrError(dateOfBirth, `Informe sua data de nascimento.`)

            let user = await User.find({ email })
            validateFieldOrError(user, `Usuário já cadastrado!`)

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