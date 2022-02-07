async function findModelOrCreateNew({ model, body }) {
    const foundOrNewModel = await model.findOne(body) || new model(body);
    await foundOrNewModel.save();
    return foundOrNewModel;
};

module.exports = findModelOrCreateNew;
