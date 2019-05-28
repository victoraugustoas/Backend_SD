const express = require('express')
const router = express.Router()

module.exports = (app) => {

    router.post('/', app.user.save)
    router.get('/:id', app.user.getByID)
    router.put('/:id', app.user.edit)
    router.delete('/:id', app.user.erase)

    app.use('/user', router)
} 