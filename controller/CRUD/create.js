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


async function saveSource(sourceBody) {
    const source = await Source.findOne(sourceBody) || new Source(sourceBody);
    await source.save();
    return source;
}

async function create(req, res, _) {
    const code = req.params.code;
    switch (code) {
        case CODES.BOOK_CODE: return res.send(await saveSource({ code, source: await createBook(req.body) }));
        case CODES.ARTICLE_BOOK_CODE: return res.send(await saveSource({ code, source: await createArticleBook(req.body)}));
        case CODES.ARTICLE_MAGAZINE_CODE: return res.send(await saveSource({ code, source: await createArticleMagazine(req.body)}));
        case CODES.ARTICLE_NEWSPAPER_CODE: return res.send(await saveSource({ code, source: await createArticleNewspaper(req.body)}));
        case CODES.CONFERENCE_CODE: return res.send(await saveSource({ code, source: await createConference(req.body)}));
        case CODES.SITE_CODE: return res.send(await saveSource({ code, source: await createSite(req.body)}));
        default: res.send('alert');
    } 
}

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
    const bookBody = {
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
    };
    const book = await Book.findOne(bookBody) || new Book(bookBody);
    await book.save();
    return book;
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
    const book = createBook(body.book);
    const articleBookBody = {
        title,
        authors,
        book,
        numberOfPages,
    };
    const articleBook = await ArticleBook.findOne(articleBookBody) || new ArticleBook(articleBookBody);
    await articleBook.save();
    return articleBook;
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
    const articleMagazineBody = {
        title,
        authors,
        magazineTitle,
        magazineNumber,
        yearOfPublishing,
        numberOfPages,
    };
    const articleMagazine = await ArticleMagazine.findOne(articleMagazineBody) || new ArticleMagazine(articleMagazineBody);
    await articleMagazine.save();
    return articleMagazine;
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
    const articleNewspaperBody = {
        title,
        authors,
        magazineTitle,
        magazineNumber,
        date,
        numberOfPages,
    };
    const articleNewspaper = await ArticleNewspaper.findOne(ArticleNewspaper) || new ArticleNewspaper(articleNewspaperBody);
    await articleNewspaper.save();
    return articleNewspaper;
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
    const conferenceBody = {
        title,
        editors,
        titleInfo,
        city,
        date,
        place,
        publishingHouse,
        numberOfPages,
    };
    const conference = await Conference.findOne(conferenceBody) || new Conference(conferenceBody);
    await conference.save();
    return conference;
}

async function createSite(body) {
    const title = body.title;
    const URL = body.numberOfPages;
    const titleInfo = body.titleInfo;
    const date = body.date;
    const siteBody = {
        title,
        URL,
        titleInfo,
        date,
    };
    const site = await Site.findOne(siteBody) || new Site(siteBody);
    await site.save();
    return site;
}

module.exports = create
