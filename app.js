const express = require('express')
const app = express()

// variáveis de ambiente
require('dotenv').config()

// DATABASE
require('./src/config/db')(app)

// MIDDLEWARES
require('./src/config/middlewares')(app)

// API
const user = require('./src/api/user')(app)

// ROUTES
require("./src/config/routes/user")(app)

app.listen(process.env.PORT, () => {
    console.log(`Backend funcionando na porta ${process.env.PORT}`)
})