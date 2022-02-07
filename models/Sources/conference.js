const mongoose = require('mongoose')

const conference = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    titleInfo: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    editors: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
    } ],
    place: {
        type: String,
        required: true,
    },
    publishingHouse: {
        type: String,
        required: true,
    },
    numberOfPages: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Conference', conference)
