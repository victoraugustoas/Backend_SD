const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const definition = {
    value: {},
    type: { type: String }
}

const foodSchema = new Schema({
    name: {
        type: {
            value: { type: String, required: true }
        }
    },
    category: {
        type: {
            value: { type: String, required: true }
        }
    },
    humidity: definition,
    energy: definition,
    protein: definition,
    lipids: definition,
    cholesterol: definition,
    carbohydrate: definition,
    'food fiber': definition,
    ashes: definition,
    calcium: definition,
    magnesium: definition,
    manganese: definition,
    phosphorus: definition,
    iron: definition,
    sodium: definition,
    potassium: definition,
    copper: definition,
    zinc: definition,
    retinol: definition,
    re: definition,
    rae: definition,
    thiamine: definition,
    riboflavin: definition,
    pyridoxine: definition,
    niacin: definition,
    'vitamin c': definition
})

module.exports = mongoose.model('Foods', foodSchema)
