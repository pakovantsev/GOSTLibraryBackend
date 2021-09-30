const mongoose = require('mongoose')

const book = new mongoose.Schema({
    author: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required: true
    } ],
    title: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Book', book)
