const express = require('express')
const mongoose = require('mongoose')
var app = express()

app.get('/', function (req, res) {
    res.send('hello world')
})

mongoose.connect('mongodb://localhost/gostlibrarydb', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('Database connected Successfully');
}).on('error', function (err) {
    console.log('Error', err);
})

app.listen(8000, function () {
    console.log('Server is Up')
})