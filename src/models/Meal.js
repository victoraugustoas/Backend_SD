const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const mealSchema = new mongoose.Schema({
    ingredients: [{
        idFood: { type: ObjectID, required: true },
        portion: { type: Number, required: true },
        qtdPortion: { type: Number, required: true }
    }],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    visibility: {
        type: Boolean,
        default: false
    },
    classification: {
        type: Number,
        required: true
    },
    urlImg: {
        type: String,
        default: ''
    },
    avgEvaluation: {
        type: Number
    }
})

module.exports = mongoose.model('meals', mealSchema)