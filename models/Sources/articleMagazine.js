const mongoose = require('mongoose')

const articleMagazine = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    magazineTitle: {
        type: String,
        required: true,
    },
    magazineNumber: {
        type: Number,
        required: true,
    },
    authors: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    } ],
    yearOfPublishing: {
        type: String,
        required: true,
    },
    numberOfPages: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('ArticleMagazine', articleMagazine)
