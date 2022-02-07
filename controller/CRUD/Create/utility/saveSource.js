const Source = require('../../../../models/source')

async function saveSource(sourceBody) {
    const source = await Source.findOne(sourceBody) || new Source(sourceBody);
    await source.save();
    return source;
};

module.exports = saveSource;
