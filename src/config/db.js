const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodbatlas-ymqp4.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, { useNewUrlParser: true })
} else {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodbatlas-ymqp4.mongodb.net/${process.env.DB_TEST}?retryWrites=true`, { useNewUrlParser: true })
    // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_TEST}`, { useNewUrlParser: true })
}

module.exports = (app) => {
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log('Conectado ao bd')
    })

    app.db = db
}