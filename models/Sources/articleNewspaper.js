const mongoose = require('mongoose')

const articleNewspaper = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    newspaperTitle: {
        type: String,
        required: true,
    },
    newspaperNumber: {
        type: Number,
        required: true,
    },
    authors: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    } ],
    date: {
        type: Date,
        required: true,
    },
    numberOfPages: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('ArticleNewspaper', articleNewspaper)
