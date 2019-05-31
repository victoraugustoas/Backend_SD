const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const favoriteSchema = new mongoose.Schema({
    idUser: {
        type: ObjectID,
        required: true
    },
    idMeal: {
        type: ObjectID,
        required: true
    }
})

module.exports = mongoose.model('favorites', favoriteSchema)