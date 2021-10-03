const mongoose = require('mongoose')

const collective = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Collective', collective)
