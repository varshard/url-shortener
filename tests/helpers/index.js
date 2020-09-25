const mongoose = require('mongoose');
const config = require('../../src/config');
module.exports = {
	async truncate() {
		await mongoose.connect(config.dbUrl, { useNewUrlParser: true });
		await mongoose.dropDatabase();
	}
};
