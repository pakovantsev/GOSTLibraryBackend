const mongoose = require('mongoose')

const articleBook = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    numberOfPages: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('ArticleBook', articleBook)
