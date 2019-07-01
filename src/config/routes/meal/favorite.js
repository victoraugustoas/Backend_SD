const express = require('express')
const router = express.Router()

module.exports = (app) => {
    router.get('/listAll', app.auth.authenticate(), app.meal.favorite.listAll)

    // CRUD
    router.post('/', app.auth.authenticate(), app.meal.favorite.save)
    router.get('/:id', app.auth.authenticate(), app.meal.favorite.getByID)
    router.delete('/:id', app.auth.authenticate(), app.meal.favorite.erase)


    app.use('/meal/favorite', router)
}