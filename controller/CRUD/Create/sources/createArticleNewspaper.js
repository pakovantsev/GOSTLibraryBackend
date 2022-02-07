const People = require('../../../../models/CommonModels/people')
const ArticleNewspaper = require('../../../../models/Sources/articleNewspaper');

const findModelOrCreateNew = require('../utility/findModelOrCreateNew');
const saveSecondaryArraysOfModels = require('../utility/saveSecondaryArraysOfModels');

async function createArticleNewspaper(body) {
    const authors = await saveSecondaryArraysOfModels({ model: People, data: body.authors });
    const articleNewspaperBody = {
        ...body,
        authors,
    };
    return findModelOrCreateNew({ model: ArticleNewspaper, body: articleNewspaperBody });
};

module.exports = createArticleNewspaper;
