const express = require('express')
const app = express()
const cloudinary = require('cloudinary').v2

// variáveis de ambiente
require('dotenv').config()

// DATABASE
require('./src/config/db')(app)

// CLOUDINARY - CDN
const cloudinaryConfig = require('./src/config/cloudinaryConfig')()
cloudinary.config(cloudinaryConfig)
app.cloudinary = cloudinary

// MIDDLEWARES
require('./src/config/middlewares')(app)

// API
const auth = require('./src/api/auth')(app)
const user = require('./src/api/user')(app)
const food = require('./src/api/food')(app)
const meal = require('./src/api/meal/meal')(app)
const favorite = require('./src/api/meal/favorite')(app)
const evaluate = require('./src/api/meal/evaluate')(app)

// ROUTES
require("./src/config/routes/food")(app)
require("./src/config/routes/user")(app)
require('./src/config/routes/meal/meal')(app)
require('./src/config/routes/meal/favorite')(app)
require('./src/config/routes/meal/evaluate')(app)

// TASKS
require('./src/config/tasks')(app)

app.listen(process.env.PORT, () => {
    console.log(`Backend funcionando na porta ${process.env.PORT}`)
})