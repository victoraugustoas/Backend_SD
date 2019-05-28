const express = require('express')
const router = express.Router()

module.exports = (app) => {

    router.post('/', app.food.save)
    router.get('/:id', app.food.getByID)
    router.put('/:id', app.food.edit)
    router.delete('/:id', app.food.erase)

    app.use('/food', router)
} 