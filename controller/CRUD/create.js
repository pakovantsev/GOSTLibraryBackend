const Book = require('../../models/Sources/book')
const ArticleBook = require('../../models/Sources/articleBook')
const ArticleMagazine = require('../../models/Sources/articleMagazine')
const ArticleNewspaper = require('../../models/Sources/articleNewspaper')
const Conference = require('../../models/Sources/conference')
const Site = require('../../models/Sources/site')
const People = require('../../models/people')
const Collective = require('../../models/collective')

async function createBook(req, res, _) {
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
    const collectives =  await Promise.all(req.body.collectives.map(async value => {
        let collective = await Collective.findOne({ name: value.name });
        if (!collective) {
            collective = new Collective({
                name: value.name
            })
            await collective.save();
        }
        return collective;
    }));
    const authors =  await Promise.all(req.body.authors.map(async author => {
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
    const editors =  await Promise.all(req.body.editors.map(async editor => {
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
    const translators =  await Promise.all(req.body.translators.map(async translator => {
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
        res.send(data)
    })
}

module.exports.createBook = createBook
