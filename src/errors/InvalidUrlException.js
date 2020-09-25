class InvalidUrlException extends Error {
	constructor() {
		super('invalid url format');
	}
}

module.exports = InvalidUrlException;
