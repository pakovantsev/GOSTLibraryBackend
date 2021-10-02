const mongoose = require('mongoose')

const site = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    titleInfo: {
        type: String,
    },
    URL: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Site', site)
