const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const evaluateSchema = new mongoose.Schema({
    evaluation: {
        type: Number,
        required: true
    },
    userID: {
        type: ObjectID,
        required: true
    },
    mealID: {
        type: ObjectID,
        required: true
    }
})

module.exports = mongoose.model('evaluation', evaluateSchema)
