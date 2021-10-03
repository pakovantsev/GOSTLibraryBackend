const Book = require('../../models/Sources/book')
const ArticleBook = require('../../models/Sources/articleBook')
const ArticleMagazine = require('../../models/Sources/articleMagazine')
const ArticleNewspaper = require('../../models/Sources/articleNewspaper')
const Conference = require('../../models/Sources/conference')
const Site = require('../../models/Sources/site')
const People = require('../../models/people')
const Collective = require('../../models/collective')

async function viewBook(_, res, _) {
    const books = await Book.find({});
    const response = await Promise.all(books.map(async value => {
        const authors = await Promise.all(value.authors.map(async author => {
            return await People.findOne({ _id: author })
        }))
        const editors = await Promise.all(value.editors.map(async editor => {
            return await People.findOne({ _id: editor })
        }))
        const translators = await Promise.all(value.translators.map(async translator => {
            return await People.findOne({ _id: translator })
        }))
        const collectives = await Promise.all(value.collectives.map(async collective => {
            return await Collective.findOne({ _id: collective })
        }))
        // TODO избавиться от _doc
        return {
            ...value._doc,
            authors,
            editors,
            translators,
            collectives
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

module.exports.viewBook = viewBook
module.exports.viewArticleBook = viewArticleBook
module.exports.viewArticleMagazine = viewArticleMagazine
module.exports.viewArticleNewspaper = viewArticleNewspaper
module.exports.viewConference = viewConference
module.exports.viewSite = viewSite
