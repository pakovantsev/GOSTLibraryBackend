const CODES = require('./constants/constants')

const Book = require('../../models/Sources/book')
const ArticleBook = require('../../models/Sources/articleBook')
const ArticleMagazine = require('../../models/Sources/articleMagazine')
const ArticleNewspaper = require('../../models/Sources/articleNewspaper')
const Conference = require('../../models/Sources/conference')
const Site = require('../../models/Sources/site')
const People = require('../../models/CommonModels/people')
const Collective = require('../../models/CommonModels/collective')
const Source = require('../../models/source')

async function savePeoplesArray(peoples){
    return Array.isArray(peoples) && await Promise.all(peoples.map(async people => {
        const peopleModelBody = {
            surname: people.surname,
            initials: people.initials,
        };
        const peopleModel = await People.findOne(peopleModelBody) || new People(peopleModelBody);
        await peopleModel.save();
        return peopleModel;
    }))
}

async function saveSource(sourceBody) {
    const source = await Source.findOne(sourceBody) || new Source(sourceBody);
    await source.save();
    return source;
}

async function createSource(req, res, _) {
    const code = req.params.code;
    let source;
    switch (code) {
        case CODES.BOOK_CODE: source = await createBook(req.body); break;
        case CODES.ARTICLE_BOOK_CODE: source = await createArticleBook(req.body); break;
        case CODES.ARTICLE_MAGAZINE_CODE: source = await createArticleMagazine(req.body); break;
        case CODES.ARTICLE_NEWSPAPER_CODE: source = await createArticleNewspaper(req.body); break;
        case CODES.CONFERENCE_CODE: source = await createConference(req.body); break;
        case CODES.SITE_CODE: source = await createSite(req.body); break;
        default: res.send('alert');
    }
    return res.send(
        await saveSource({ 
            code, 
            source,
        })
    );
}

async function createBook(body) {
    const collectives = Array.isArray(body.collectives) && await Promise.all(body.collectives.map(async value => {
        let collective = await Collective.findOne({ name: value.name });
        if (!collective) {
            collective = new Collective({
                name: value.name
            })
            await collective.save();
        }
        return collective;
    }));
    const authors = await savePeoplesArray(body.authors);
    const editors = await savePeoplesArray(body.editors);
    const translators = await savePeoplesArray(body.translators);
    const bookBody = {
        ...body,
        authors,
        editors,
        translators,
        collectives,
    };
    const book = await Book.findOne(bookBody) || new Book(bookBody);
    await book.save();
    return book;
}

async function createArticleBook(body) {
    const authors = await savePeoplesArray(body.authors);
    const book = await createBook(body.book);
    const articleBookBody = {
        ...body,
        authors,
        book,
    };
    const articleBook = await ArticleBook.findOne(articleBookBody) || new ArticleBook(articleBookBody);
    await articleBook.save();
    return articleBook;
}

async function createArticleMagazine(body) {
    const authors = await savePeoplesArray(body.authors);
    const articleMagazineBody = {
        ...body,
        authors,
    };
    const articleMagazine = await ArticleMagazine.findOne(articleMagazineBody) || new ArticleMagazine(articleMagazineBody);
    await articleMagazine.save();
    return articleMagazine;
}

async function createArticleNewspaper(body) {
    const authors = await savePeoplesArray(body.authors);
    const articleNewspaperBody = {
        ...body,
        authors,
    };
    const articleNewspaper = await ArticleNewspaper.findOne(articleNewspaperBody) || new ArticleNewspaper(articleNewspaperBody);
    await articleNewspaper.save();
    return articleNewspaper;
}

async function createConference(body) {
    const editors = await savePeoplesArray(body.editors);
    const conferenceBody = {
        ...body,
        editors,
    };
    const conference = await Conference.findOne(conferenceBody) || new Conference(conferenceBody);
    await conference.save();
    return conference;
}

async function createSite(body) {
    const site = await Site.findOne(body) || new Site(body);
    await site.save();
    return site;
}

module.exports = createSource
