const path = require('path');
const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mount = require('koa-mount');

const config = require('./config');
const logger = require('./logger')(config.log);
const initModels = require('./models');
const initServices = require('./services');
const initRoutes = require('./routes');

module.exports = async () => {
	const app = new Koa();
	const publicPath = path.join(__dirname, '..', 'public');
	app.use(mount('/public', serve(publicPath)));
	await initDb();
	const models = initModels(mongoose);
	const services = initServices(models);

	app.silent = true;
	app.use(logger);
	app.use(bodyParser());

	const apiRoutes = initRoutes(services);

	app.use(apiRoutes.middleware());

	return app;
};

async function initDb() {
	return mongoose.connect(config.dbUrl, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
}
