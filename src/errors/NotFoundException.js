class NotFoundException extends Error {
	constructor() {
		super('not found');
	}
}

module.exports = NotFoundException;
