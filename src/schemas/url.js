const mongoose = require('mongoose');

const UrlShortener = require('../urlShortener');

const schema = new mongoose.Schema(
	{
		id: Number,
		url: String,
		created: Date
	},
	{ collection: 'Urls' }
);

schema.static('findByUrl', async function (url) {
	return this.findOne({ url });
});

schema.static('findByShortenUrl', async function (shortenUrl) {
	const deconded = UrlShortener.decode(shortenUrl);
	const id = parseInt(deconded);
	if (isNaN(id)) {
		return null;
	}
	return this.findOne({ id });
});

schema.virtual('shortenUrl').get(function () {
	return UrlShortener.encode('' + this.id);
});

schema.pre('save', function (next) {
	if (!this.created) {
		this.created = new Date();
	}
	next();
});

module.exports = schema;
