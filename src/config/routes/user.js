const express = require('express')
const router = express.Router()

module.exports = (app) => {

    router.post('/', app.user.save)

    app.use('/user', router)
} 