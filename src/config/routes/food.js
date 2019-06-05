const express = require('express')
const router = express.Router()

module.exports = (app) => {

    // CRUD
    router.post('/', app.auth.authenticate(), app.food.save)
    router.get('/:id', app.auth.authenticate(), app.food.getByID)
    router.put('/:id', app.auth.authenticate(), app.food.edit)
    router.delete('/:id', app.auth.authenticate(), app.food.erase)

    // Buscas
    router.get('/search/nutrient/', app.auth.authenticate(), app.food.searchByNutrient)
    router.post('/search/name/', app.food.searchByName)

    app.use('/food', router)
}