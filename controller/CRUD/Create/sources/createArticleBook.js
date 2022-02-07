const People = require('../../../../models/CommonModels/people')
const ArticleBook = require('../../../../models/Sources/articleBook');

const findModelOrCreateNew = require('../utility/findModelOrCreateNew');
const saveSecondaryArraysOfModels = require('../utility/saveSecondaryArraysOfModels');
const createBook = require('./createBook');

async function createArticleBook(body) {
    const authors = await saveSecondaryArraysOfModels({ model: People, data: body.authors });
    const book = await createBook(body.book);
    const articleBookBody = {
        ...body,
        authors,
        book,
    };
    return findModelOrCreateNew({ model: ArticleBook, body: articleBookBody });
};

module.exports = createArticleBook;
