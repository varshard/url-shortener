const UrlShortenerService = require('./urlShortenerService');

const init = (models) => {
	return {
		urlShortenerService: new UrlShortenerService(models)
	};
};

module.exports = init;
