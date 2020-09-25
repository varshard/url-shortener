class InternalServerErrorException extends Error {
	constructor() {
		super('internal server error');
	}
}

module.exports = InternalServerErrorException;
