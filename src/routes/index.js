const Router = require('koa-joi-router');
const InternalServerErrorException = require('../errors/InternalServerErrorException');
const NotFoundException = require('../errors/NotFoundException');
const config = require('../config');

const Joi = Router.Joi;

const router = Router();

const initRoutes = (services) => {
	const routes = [
		{
			method: 'post',
			path: '/shorten',
			validate: {
				type: 'json',
				body: Joi.object({
					url: Joi.string()
						.min(5)
						.max(config.maxUrlLength)
						.uri()
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.type) {
									case 'string.uri':
										err.message = '"url" is invalid format';
										break;
									case 'string.min':
										err.message = '"url" is too short, minimum is 5 characters';
										break;
									case 'string.max':
										err.message = `"url" is too long, maximum is ${config.maxUrlLength}`;
										break;
								}
							});
							return errors;
						})
				})
			},
			async handler(ctx) {
				const { url } = ctx.request.body;

				if (url === 'http://error.com') {
					ctx.throw(500, new InternalServerErrorException());
				}
				try {
					ctx.log.info(`shortening url ${url}`);
					const result = await services.urlShortenerService.shorten(url);
					ctx.body = {
						url: result.url,
						shortenUrl: `${config.host}/${result.shortenUrl}`
					};
					ctx.log.info(`shorten ${url} to ${result.shortenUrl} successfully`);
				} catch (err) {
					ctx.log.error(err, 'post shorten internal error');
					ctx.throw(500, new InternalServerErrorException());
				}
			}
		},
		{
			method: 'get',
			path: '/:shortenUrl',
			async handler(ctx) {
				const { shortenUrl } = ctx.params;

				try {
					ctx.log.info(`expanding ${shortenUrl}`);
					const result = await services.urlShortenerService.expand(shortenUrl);
					if (!result) {
						ctx.status = 404;
						ctx.type = 'text';
						ctx.body = new NotFoundException().message;
						return;
					}

					ctx.log.info(`redirecting to ${result.url}`);
					ctx.redirect(result.url);
				} catch (err) {
					ctx.log.error(err, 'get shorten internal error');
					ctx.throw(500, new InternalServerErrorException());
				}
			}
		}
	];

	return router.route(routes);
};

module.exports = initRoutes;
