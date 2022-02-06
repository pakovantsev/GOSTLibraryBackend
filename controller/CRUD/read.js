const CODES = require('./constants/constants')

const Book = require('../../models/Sources/book')
const ArticleBook = require('../../models/Sources/articleBook')
const ArticleMagazine = require('../../models/Sources/articleMagazine')
const ArticleNewspaper = require('../../models/Sources/articleNewspaper')
const Conference = require('../../models/Sources/conference')
const Site = require('../../models/Sources/site')
const People = require('../../models/CommonModels/people')
const Collective = require('../../models/CommonModels/collective')

async function read(req,res, _) {
    const code = req.params.code;
    switch (code) {
        case CODES.BOOK_CODE: return res.send(await viewBook());
        case CODES.ARTICLE_BOOK_CODE: return res.send(await viewArticleBook());
        case CODES.ARTICLE_MAGAZINE_CODE: return res.send(await viewArticleMagazine());
        case CODES.ARTICLE_NEWSPAPER_CODE: return res.send(await viewArticleNewspaper());
        case CODES.CONFERENCE_CODE: return res.send(await viewConference());
        case CODES.SITE_CODE: return res.send(await viewSite());
        default: res.send(await viewAll());
    }
 }

async function viewAll() { 
    const book = await viewBook();
    const articleBook = await viewArticleBook();
    const articleMagazine = await viewArticleMagazine();
    const articleNewspaper = await viewArticleNewspaper();
    const conference = await viewConference();
    const site = await viewSite();
    return [...book, ...articleBook, ...articleMagazine, ...articleNewspaper, ...conference, ...site];

}

async function viewBook() {
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
    return response;
}

async function viewArticleBook() {
    const articles = await ArticleBook.find({})
    const response = await Promise.all(articles.map(async value => {
        const authors = await Promise.all(value.authors.map(async author => {
            return await People.findOne({ _id: author })
        }))
        const bookFind = await Book.find({ _id: value.book });
        const book = await Promise.all(bookFind.map(async v => {
            const authors = await Promise.all(v.authors.map(async author => {
                return await People.findOne({ _id: author })
            }))
            const editors = await Promise.all(v.editors.map(async editor => {
                return await People.findOne({ _id: editor })
            }))
            const translators = await Promise.all(v.translators.map(async translator => {
                return await People.findOne({ _id: translator })
            }))
            const collectives = await Promise.all(v.collectives.map(async collective => {
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
        // TODO избавиться от _doc
        return {
            ...value._doc,
            authors,
            book
        }
    }));
    return response;
}

async function viewArticleMagazine() {
    const articles = await ArticleMagazine.find({});
    const response = await Promise.all(articles.map(async value => {
        const authors = await Promise.all(value.authors.map(async author => {
            return await People.findOne({ _id: author })
        }))
        // TODO избавиться от _doc
        return {
            ...value._doc,
            authors
        }
    }));
    return response;
}

async function viewArticleNewspaper() {
    const articles = await ArticleNewspaper.find({});
    const response = await Promise.all(articles.map(async value => {
        const authors = await Promise.all(value.authors.map(async author => {
            return await People.findOne({ _id: author })
        }))
        // TODO избавиться от _doc
        return {
            ...value._doc,
            authors
        }
    }));
    return response;
}

async function viewConference() {
    const conferences = await Conference.find({});
    const response = await Promise.all(conferences.map(async value => {
        const editors = await Promise.all(value.editors.map(async editor => {
            return await People.findOne({ _id: editor })
        }))
        // TODO избавиться от _doc
        return {
            ...value._doc,
            editors
        }
    }));
    return response;
}

function viewSite() {
    Site.find({}).then(data => {
        return data;
    });
}

module.exports.read = read
