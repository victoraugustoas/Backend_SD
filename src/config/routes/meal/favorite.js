const express = require('express')
const router = express.Router()

module.exports = (app) => {
    // CRUD
    router.post('/', app.meal.favorite.save)
    router.get('/:id', app.meal.favorite.getByID)
    router.delete('/:id', app.meal.favorite.erase)

    app.use('/meal/favorite', router)
}