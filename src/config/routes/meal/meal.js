const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('../../multerConfig')

module.exports = (app) => {
    // CRUD
    router.post('/', app.auth.authenticate(), multer(multerConfig).single('urlImg'), app.meal.save)
    router.get('/:id', app.auth.authenticate(), app.meal.getByID)
    router.put('/:id', app.auth.authenticate(), app.meal.edit)
    router.delete('/:id', app.auth.authenticate(), app.meal.erase)

    app.use('/meal', router)
}