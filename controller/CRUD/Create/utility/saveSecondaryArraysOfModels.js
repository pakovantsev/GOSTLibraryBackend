async function saveSecondaryArraysOfModels({ model, data }){
    return Array.isArray(data) && await Promise.all(data.map(async people => {
        const peopleModel = await model.findOne({ ...people }) || new model({ ...people });
        await peopleModel.save();
        return peopleModel;
    }))
};

module.exports = saveSecondaryArraysOfModels;
