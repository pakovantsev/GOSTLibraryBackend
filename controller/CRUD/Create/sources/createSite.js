const Site = require('../../../../models/Sources/site');

const findModelOrCreateNew = require('../utility/findModelOrCreateNew');

async function createSite(body) {
    return findModelOrCreateNew({ model: Site, body });
};

module.exports = createSite;
