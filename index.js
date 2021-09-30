const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/router')
const cors = require('cors');
var app = express()

var corsOptions = {
    origin: "*"
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions));


app.use('/api', router)

mongoose.connect('mongodb://localhost/gostlibrarydb', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('Database connected Successfully');
}).on('error', function (err) {
    console.log('Error', err);
})

app.listen(8000, function () {
    console.log('Server is Up')
})
