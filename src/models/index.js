const UrlSchema = require('../schemas/url');
const SequenceSchema = require('../schemas/sequence');

const createModel = (mongoose, modelName, schema) => {
	return mongoose.model(modelName, schema);
};

const init = (mongoose) => {
	return {
		Url: createModel(mongoose, 'Url', UrlSchema),
		Sequence: createModel(mongoose, 'Sequence', SequenceSchema)
	};
};

module.exports = init;
