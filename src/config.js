let maxUrlLength = parseInt(process.env.MAX_URL);
if (isNaN(maxUrlLength)) {
	maxUrlLength = 2000;
}

module.exports = {
	dbUrl: process.env.DB_URL,
	log: process.env.LOG,
	host: process.env.HOST_URL,
	maxUrlLength
};
