const Book = require('../models/book')
const People = require('../models/people')

function create(req, res, _) {
    let surname = req.body.surname;
    let initals = req.body.initals;
    let author = new People({
        surname,
        initals
    })
    author.save();
    let title = req.body.title;
    let book = new Book({
        author: [author],
        title
    })
    book.save().then((data) => {
        res.send(data)
    })}

function view(_, res, _) {
    Book.find({}).then((data) => {
        res.send(data)
    })
}

function update(req, res, next) {}

function remove(req, res, next) {}

module.exports.create = create
module.exports.view = view
module.exports.update = update
module.exports.remove = remove
