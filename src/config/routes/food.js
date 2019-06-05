const express = require('express')
const router = express.Router()

module.exports = (app) => {

    // CRUD
    router.post('/', app.food.save)
    router.get('/:id', app.food.getByID)
    router.put('/:id', app.food.edit)
    router.delete('/:id', app.food.erase)

    // Buscas
    router.get('/search/nutrient/', app.food.searchByNutrient)
    router.post('/search/name/', app.food.searchByName)

    app.use('/food', router)
} 