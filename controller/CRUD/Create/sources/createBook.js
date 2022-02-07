const People = require('../../../../models/CommonModels/people')
const Collective = require('../../../../models/CommonModels/collective')
const Book = require('../../../../models/Sources/book');

const saveSecondaryArraysOfModels = require('../utility/saveSecondaryArraysOfModels');
const findModelOrCreateNew = require('../utility/findModelOrCreateNew');

async function createBook(body) {
    const collectives = await saveSecondaryArraysOfModels({ model: Collective, data: body.collectives });
    const authors = await saveSecondaryArraysOfModels({ model: People, data: body.authors });
    const editors = await saveSecondaryArraysOfModels({ model: People, data: body.editors });
    const translators = await saveSecondaryArraysOfModels({ model: People, data: body.translators });
    const bookBody = {
        ...body,
        authors,
        editors,
        translators,
        collectives,
    };
    return findModelOrCreateNew({ model: Book, body: bookBody });
};

module.exports = createBook;
