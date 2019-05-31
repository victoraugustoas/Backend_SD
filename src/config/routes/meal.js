const express = require('express')
const router = express.Router()

module.exports = (app) => {
    // CRUD
    router.post('/', app.meal.save)
    router.get('/:id', app.meal.getByID)
    router.put('/:id', app.meal.edit)
    router.delete('/:id', app.meal.erase)

    app.use('/meal', router)
}