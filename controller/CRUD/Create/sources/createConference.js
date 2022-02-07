const People = require('../../../../models/CommonModels/people')
const Conference = require('../../../../models/Sources/conference');

const findModelOrCreateNew = require('../utility/findModelOrCreateNew');
const saveSecondaryArraysOfModels = require('../utility/saveSecondaryArraysOfModels');

async function createConference(body) {
    const editors = await saveSecondaryArraysOfModels({ model: People, data: body.editors });
    const conferenceBody = {
        ...body,
        editors,
    };
    return findModelOrCreateNew({ model: Conference, body: conferenceBody });
};

module.exports = createConference;
