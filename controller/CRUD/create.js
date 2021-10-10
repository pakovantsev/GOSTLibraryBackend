const CODES = require('./constants/constants')

const Book = require('../../models/Sources/book')
const ArticleBook = require('../../models/Sources/articleBook')
const ArticleMagazine = require('../../models/Sources/articleMagazine')
const ArticleNewspaper = require('../../models/Sources/articleNewspaper')
const Conference = require('../../models/Sources/conference')
const Site = require('../../models/Sources/site')
const People = require('../../models/people')
const Collective = require('../../models/collective')


async function create(req, res, _) {
    const code = req.params.code;
    switch (code) {
        case CODES.BOOK_CODE: res.send(await createBook(req.body));
        case CODES.ARTICLE_BOOK_CODE: res.send(await createArticleBook(req.body));
        case CODES.ARTICLE_MAGAZINE_CODE: res.send(await createArticleMagazine(req.body));
        case CODES.ARTICLE_NEWSPAPER_CODE: res.send(await createArticleNewspaper(req.body));
        case CODES.CONFERENCE_CODE: res.send(await createConference(req.body));
        case CODES.SITE_CODE: res.send(await createSite(req.body));
        default: res.send('alert');
    } }

async function createBook(body) {
    const title = body.title;
    const titleInfo = body.titleInfo;
    const place = body.place;
    const publishingHouse = body.publishingHouse;
    const rePlace = body.rePlace;
    const rePublishingHouse = body.rePublishingHouse;
    const yearOfPublishing = body.yearOfPublishing;
    const numberOfPages = body.numberOfPages;
    const tomNumber = body.tomNumber;
    const tomCount = body.tomCount;
    const tomName = body.tomName;
    const collectives =  await Promise.all(body.collectives.map(async value => {
        let collective = await Collective.findOne({ name: value.name });
        if (!collective) {
            collective = new Collective({
                name: value.name
            })
            await collective.save();
        }
        return collective;
    }));
    const authors =  await Promise.all(body.authors.map(async author => {
        let people = await People.findOne({
            surname: author.surname,
            initials: author.initials,
        })
        if (!people) {
            people = new People({
                surname: author.surname,
                initials: author.initials,
            });
            await people.save();
        }
        return people;
    }))
    const editors =  await Promise.all(body.editors.map(async editor => {
        let people = await People.findOne({
            surname: editor.surname,
            initials: editor.initials,
        })
        if (!people) {
            people = new People({
                surname: editor.surname,
                initials: editor.initials,
            });
            await people.save();
        }
        return people;
    }))
    const translators =  await Promise.all(body.translators.map(async translator => {
        let people = await People.findOne({
            surname: translator.surname,
            initials: translator.initials,
        })
        if (!people) {
            people = new People({
                surname: translator.surname,
                initials: translator.initials,
            });
            await people.save();
        }
        return people;
    }))
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
        return data;
    })
}

async function createArticleBook(body) { }

async function createArticleMagazine(body) { }

async function createArticleNewspaper(body) { }

async function createConference(body) { }

async function createSite(body) { }

module.exports.create = create
