const People = require('../../../../models/CommonModels/people')
const ArticleMagazine = require('../../../../models/Sources/articleMagazine');

const findModelOrCreateNew = require('../utility/findModelOrCreateNew');
const saveSecondaryArraysOfModels = require('../utility/saveSecondaryArraysOfModels');

async function createArticleMagazine(body) {
    const authors = await saveSecondaryArraysOfModels({ model: People, data: body.authors });
    const articleMagazineBody = {
        ...body,
        authors,
    };
    return findModelOrCreateNew({ model: ArticleMagazine, body: articleMagazineBody });
};

module.exports = createArticleMagazine;
