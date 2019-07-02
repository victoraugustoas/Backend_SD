const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('../../multerConfig')

module.exports = (app) => {
    router.get('/searchByName/', app.auth.authenticate(), app.meal.searchByName)
    router.get('/listAllUser', app.auth.authenticate(), app.meal.listAllUser)
    router.get('/listAll', app.auth.authenticate(), app.meal.listAll)

    // CRUD
    router.post('/', app.auth.authenticate(), multer(multerConfig).single('urlImg'), app.meal.save)
    router.get('/:id', app.auth.authenticate(), app.meal.getByID)
    router.put('/:id', app.auth.authenticate(), app.meal.edit)
    router.delete('/:id', app.auth.authenticate(), app.meal.erase)


    app.use('/meal', router)
}