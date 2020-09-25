const initServer = require('./src/server');

initServer().then((server) => {
	server.listen(3000);
});
