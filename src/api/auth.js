const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJWT
const { validateNotExistFieldOrError, validateExistFieldOrError } = require('../util/utils')

module.exports = (app) => {
    const signin = async (req, res) => {
        try {
            let { email, password } = req.body
            validateNotExistFieldOrError(email, `Informe seu email.`, 400)
            validateNotExistFieldOrError(password, `Informe sua senha.`, 400)

            let user = await User.findOne({ email })
            if (!user) return res.status(400).send({ msg: `Usuário não encontrado.` })

            let passwordOk = await bcrypt.compare(password, user.password)
            if (!passwordOk) return res.status(400).send({ msg: `Senha incorreta.` })

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isPremium: user.isPremium,
                urlImg: user.urlImg,
                gender: user.gender,
                iat: now, // token emitido em,
                exp: now + (60 * 60 * 24 * 3) // token expira em 3 dias
            }

            res.status(200).json({
                ...payload,
                token: jwt.encode(payload, process.env.AUTH_SECRET)
            })

        } catch (error) {
            console.log(error)
            if (error.status) {
                let { msg } = error
                return res.status(error.status).send({ msg })
            } else {
                return res.status(500).send(error)
            }
        }

    }

    const validateToken = async (req, res) => {
        try {
            const userData = req.body
            if (userData) {
                const token = jwt.decode(userData.token, process.env.AUTH_SECRET)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
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

        res.send(false)
    }

    const strategy = new Strategy({
        secretOrKey: process.env.AUTH_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
        let user = await User.findById(payload._id)
        if (user) {
            done(null, user ? user : false)
        } else {
            done(null, false)
        }
    })

    passport.use(strategy)

    const authenticate = () => passport.authenticate('jwt', { session: false })

    app.auth = {
        signin,
        validateToken,
        authenticate
    }
}