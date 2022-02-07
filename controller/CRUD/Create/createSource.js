const CODES = require('../constants/constants');

const createArticleBook = require('./sources/createArticleBook');
const createArticleMagazine = require('./sources/createArticleMagazine');
const createArticleNewspaper = require('./sources/createArticleNewspaper');
const createBook = require('./sources/createBook');
const createConference = require('./sources/createConference');
const createSite = require('./sources/createSite');
const saveSource = require('./utility/saveSource')

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
        default: res.send({ status: 400, message: 'Incorrect source code'});
    }
    return res.send(
        await saveSource({ 
            code, 
            source,
        })
    );
};

module.exports = createSource
