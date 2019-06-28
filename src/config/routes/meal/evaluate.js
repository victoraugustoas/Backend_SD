const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('../../multerConfig')

module.exports = (app) => {

    // CRUD
    router.post('/', app.auth.authenticate(), app.meal.evaluate.save)
    router.put('/:id', app.auth.authenticate(), app.meal.evaluate.edit)
    router.get('/:mealID', app.auth.authenticate(), app.meal.evaluate.getByID)
    router.delete('/:id', app.auth.authenticate(), app.meal.evaluate.erase)

    app.use('/meal/evaluation', router)
}
