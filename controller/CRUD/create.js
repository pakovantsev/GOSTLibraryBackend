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
        case CODES.BOOK_CODE: return res.send(await createBook(req.body));
        case CODES.ARTICLE_BOOK_CODE: return res.send(await createArticleBook(req.body));
        case CODES.ARTICLE_MAGAZINE_CODE: return res.send(await createArticleMagazine(req.body));
        case CODES.ARTICLE_NEWSPAPER_CODE: return res.send(await createArticleNewspaper(req.body));
        case CODES.CONFERENCE_CODE: return res.send(await createConference(req.body));
        case CODES.SITE_CODE: return res.send(await createSite(req.body));
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
    book.save().then(data => {
        return data;
    })
}

async function createArticleBook(body) {
    const title = body.title;
    const numberOfPages = body.numberOfPages;
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
    const book = createBook(book);
    const articleBook = new ArticleBook({
        title,
        authors,
        book,
        numberOfPages,
    })
    articleBook.save().then(data => {
        return data;
    })
 }

async function createArticleMagazine(body) {
    const title = body.title;
    const numberOfPages = body.numberOfPages;
    const magazineTitle = body.magazineTitle;
    const magazineNumber = body.magazineNumber;
    const yearOfPublishing = body.yearOfPublishing;
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
    const articleMagazine = new ArticleMagazine({
        title,
        authors,
        magazineTitle,
        magazineNumber,
        yearOfPublishing,
        numberOfPages,
    })
    articleMagazine.save().then(data => {
        return data;
    })
}

async function createArticleNewspaper(body) {
    const title = body.title;
    const numberOfPages = body.numberOfPages;
    const magazineTitle = body.newspaperTitle;
    const magazineNumber = body.newspaperNumber;
    const date = body.date;
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
    const articleNewspaper = new ArticleNewspaper({
        title,
        authors,
        magazineTitle,
        magazineNumber,
        date,
        numberOfPages,
    })
    articleNewspaper.save().then(data => {
        return data;
    })
}

async function createConference(body) {
    const title = body.title;
    const numberOfPages = body.numberOfPages;
    const titleInfo = body.titleInfo;
    const city = body.city;
    const date = body.date;
    const place = body.place;
    const publishingHouse = body.publishingHouse;
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
    const conference = new Conference({
        title,
        editors,
        titleInfo,
        city,
        date,
        place,
        publishingHouse,
        numberOfPages,
    })
    conference.save().then(data => {
        return data;
    }) 
}

async function createSite(body) {
    const title = body.title;
    const URL = body.numberOfPages;
    const titleInfo = body.titleInfo;
    const date = body.date;
    const site = new Site({
        title,
        URL,
        titleInfo,
        date,
    })
    site.save().then(data => {
        return data;
    }) 
}

module.exports.create = create
