const mongoose = require('mongoose')

const source = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

module.exports = mongoose.model('Source', source)
