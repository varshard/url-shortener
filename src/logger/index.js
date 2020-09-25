const Logger = require('koa-pino-logger');

module.exports = (enabled) => {
	return Logger({ enabled });
};
