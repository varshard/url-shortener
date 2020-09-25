const mongoose = require('mongoose');
const INDEX = 'url-shortener';
const schema = new mongoose.Schema(
	{
		name: String,
		value: Number
	},
	{ collection: 'Sequences' }
);

schema.static('increment', async function () {
	const sequence = await this.findOneAndUpdate(
		{ name: INDEX },
		{ $inc: { value: 1 } },
		{ upsert: true, new: true }
	);

	if (!sequence) {
		return this.create({
			name: INDEX,
			value: 1
		});
	}
	return sequence;
});

module.exports = schema;
