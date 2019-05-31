const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    urlImg: {
        type: String,
        required: false,
        default: ''
    },
    isPremium: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Users', userSchema)
