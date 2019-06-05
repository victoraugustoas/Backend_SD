const mongoose = require('mongoose')
const Schema = mongoose.Schema

const similarsSchema = new Schema({
    similars: [
        {
            similarity: { type: Number }
        }
    ]
})

module.exports = mongoose.model('similars', similarsSchema)
