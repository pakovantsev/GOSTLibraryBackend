const mongoose = require('mongoose')

const book = new mongoose.Schema({
    authors: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    } ],
    title: {
        type: String,
        required: true
    },
    titleInfo: {
        type: String,
    },
    editors: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    } ],
    translators: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    } ],
    collectives: [ {
        type: String,
    } ],
    place: {
        type: String,
    },
    publishingHouse: {
        type: String,
    },
    rePlace: {
        type: String,
    },
    rePublishingHouse: {
        type: String,
    },
    yearOfPublishing: {
        type: String,
    },
    nunberOfPages: {
        type: Number,
    },
    tomNumber: {
        type: Number,
    },
    tomCount: {
        type: Number,
    },
    tomName: {
        type: String,
    },
})

module.exports = mongoose.model('Book', book)
