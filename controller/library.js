const Book = require('../models/Sources/book')
const ArticleBook = require('../models/Sources/articleBook')
const ArticleMagazine = require('../models/Sources/articleMagazine')
const ArticleNewspaper = require('../models/Sources/articleNewspaper')
const Conference = require('../models/Sources/conference')
const Site = require('../models/Sources/site')
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
        authors: [author],
        title
    })
    book.save().then((data) => {
        res.send(data)
    })}

async function viewBook(_, res, _) {
    const books = await Book.find({});
    const response = await Promise.all(books.map(async value => {
        const promise = await Promise.all(value.authors.map(async author => {
            return await People.findOne({ _id: author })
        }))
        return {
            authors: promise
        }
    }));
    res.send(response)
}

function viewArticleBook(_, res, _) {
    ArticleBook.find({}).then(data => {
        res.send(data);
    });
}

function viewArticleMagazine(_, res, _) {
    ArticleMagazine.find({}).then(data => {
        res.send(data);
    });
}

function viewArticleNewspaper(_, res, _) {
    ArticleNewspaper.find({}).then(data => {
        res.send(data);
    });
}

function viewConference(_, res, _) {
    Conference.find({}).then(data => {
        res.send(data);
    });
}

function viewSite(_, res, _) {
    Site.find({}).then(data => {
        res.send(data);
    });
}

function update(req, res, next) {}

function remove(req, res, next) {}

module.exports.create = create
module.exports.viewBook = viewBook
module.exports.viewArticleBook = viewArticleBook
module.exports.viewArticleMagazine = viewArticleMagazine
module.exports.viewArticleNewspaper = viewArticleNewspaper
module.exports.viewConference = viewConference
module.exports.viewSite = viewSite
module.exports.update = update
module.exports.remove = remove
