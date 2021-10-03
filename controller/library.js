const Book = require('../models/Sources/book')
const ArticleBook = require('../models/Sources/articleBook')
const ArticleMagazine = require('../models/Sources/articleMagazine')
const ArticleNewspaper = require('../models/Sources/articleNewspaper')
const Conference = require('../models/Sources/conference')
const Site = require('../models/Sources/site')
const People = require('../models/people')
const Collective = require('../models/collective')

function create(req, res, _) {
    const title = req.body.title;
    const titleInfo = req.body.titleInfo;
    const place = req.body.place;
    const publishingHouse = req.body.publishingHouse;
    const rePlace = req.body.rePlace;
    const rePublishingHouse = req.body.rePublishingHouse;
    const yearOfPublishing = req.body.yearOfPublishing;
    const numberOfPages = req.body.numberOfPages;
    const tomNumber = req.body.tomNumber;
    const tomCount = req.body.tomCount;
    const tomName = req.body.tomName;
    const collectives = req.body.collectives.map(value => {
        const collective = new Collective({
            name: value.name
        })
        collective.save();
        return collective;
    });
    const authors = req.body.authors.map(author => {
        const people = new People({
            surname: author.surname,
            initials: author.initials,
        });
        people.save();
        return people;
    })
    const editors = req.body.editors.map(editor => {
        const people = new People({
            surname: editor.surname,
            initials: editor.initials,
        })
        people.save();
        return people;
    })
    const translators = req.body.translators.map(translator => {
        const people = new People({
            surname: translator.surname,
            initials: translator.initials,
        })
        people.save();
        return people;
    })
    const book = new Book({
        title,
        titleInfo,
        authors,
        editors,
        translators,
        collectives,
        place,
        publishingHouse,
        rePlace,
        rePublishingHouse,
        yearOfPublishing,
        numberOfPages,
        tomCount,
        tomName,
        tomNumber,
    })
    book.save().then((data) => {
        res.send(data)
    })
}

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

function update(req, res, next) { }

function remove(req, res, next) { }

module.exports.create = create
module.exports.viewBook = viewBook
module.exports.viewArticleBook = viewArticleBook
module.exports.viewArticleMagazine = viewArticleMagazine
module.exports.viewArticleNewspaper = viewArticleNewspaper
module.exports.viewConference = viewConference
module.exports.viewSite = viewSite
module.exports.update = update
module.exports.remove = remove
