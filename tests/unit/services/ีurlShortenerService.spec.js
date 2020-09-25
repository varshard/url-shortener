const mongoose = require('mongoose');

const UrlShortenerService = require('../../../src/services/urlShortenerService');
const config = require('../../../src/config');
const initModels = require('../../../src/models');
const UrlShortener = require('../../../src/urlShortener');

describe('UrlShortenerService', () => {
	let service;
	let models;
	beforeAll(async () => {
		await mongoose.connect(config.dbUrl, {
			useNewUrlParser: true,
			useFindAndModify: false
		});
		models = initModels(mongoose);
		service = new UrlShortenerService(models);
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
	});

	describe('shorten', () => {
		it('should return a shorten url', async () => {
			const url =
				'https://github.com/nock/nock#enabledisable-real-http-requests';
			const result = await service.shorten(url);

			expect(result.id).not.toBeNull();
			expect(result.shortenUrl).toBe(UrlShortener.encode('' + result.id));
			expect(result.url).toBe(url);
			expect(result.created instanceof Date).toBeTruthy();
		});

		it('should not change sequence value if url is already registered (idempotency)', async () => {
			const url =
				'http://username:password@www.example.com:80/path/to/file.php?foo=316&bar=this+has+spaces#anchor';
			const result1 = await service.shorten(url);

			const result2 = await service.shorten(url);

			expect(result1.id).toBe(result2.id);
			expect(result1.shortenUrl).toBe(result2.shortenUrl);
		});
	});

	describe('expand', () => {
		it('should expand a shorten url to correctly', async () => {
			const url = 'https://www.example.com:777/a/b?c=d&e=f#g';
			const shortenResult = await service.shorten(url);

			const result = await service.expand(shortenResult.shortenUrl);
			expect(result.url).toBe(url);
		});

		it('should return null if url is not recognized', async () => {
			const result = await service.expand('https://john.cena');
			expect(result).toBeNull();
		});
	});
});
