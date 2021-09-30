const mongoose = require('mongoose')

const people = new mongoose.Schema({
    surname: {
        type: String,
        required: true
    },
    initals: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('People', people)
