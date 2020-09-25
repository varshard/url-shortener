const atob = require('atob');
const btoa = require('btoa');

class UrlShortener {
	static encode(str) {
		return btoa(str);
	}

	static decode(shortenUrl) {
		return atob(shortenUrl);
	}
}

module.exports = UrlShortener;
