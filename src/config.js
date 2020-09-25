let maxUrlLength = parseInt(process.env.MAX_URL);
if (isNaN(maxUrlLength)) {
	maxUrlLength = 2000;
}

const logEnabled = process.env.LOG === 'true';

module.exports = {
	dbUrl: process.env.DB_URL,
	log: logEnabled,
	host: process.env.HOST_URL,
	maxUrlLength
};
