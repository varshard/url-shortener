const supertest = require('supertest');
const mongoose = require('mongoose');
const initServer = require('../../src/server');

describe('api integration', () => {
	let server;
	let request;
	beforeAll(async () => {
		server = await initServer();
		request = supertest(server.callback());
	});

	afterAll(async () => {
		await mongoose.connect();
		server.close();
	});

	describe('POST /shorten', () => {
		const url = 'https://github.com/nock/nock#enabledisable-real-http-requests';
		const endpoint = '/shorten';

		it('should shorten a url successfully', async () => {
			const resp = await request.post(endpoint).send({ url }).expect(200);

			const { body } = resp;
			expect(body.url).toBe(url);
			expect(body.shortenUrl).not.toBeNull();
		});

		describe('invalid', () => {
			it('should return 400 if url is not supplied', async () => {
				await request.post(endpoint).send().expect(400);
			});

			it('should return 400 if url is an invalid url', async () => {
				await request.post(endpoint).send({ url: 'foo bar' }).expect(400);
			});

			it('should return 400 if url is longer than 2000 characters', async () => {
				let url = 'https://google.com/search?q=';
				for (let i = 0; i < 2000; i++) {
					url += 'a';
				}
				await request.post(endpoint).send({ url }).expect(400);
			});
		});
	});

	describe('GET /', () => {
		it('should redirect to the destination url', async () => {
			const url = 'https://github.com/varshard?tab=repositories';
			const resp = await request.post('/shorten').send({ url });
			const parts = resp.body.shortenUrl.split('/');
			const shorten = parts[parts.length - 1];

			await request
				.get(`/${shorten}`)
				.send()
				.expect(302)
				.expect('Location', url);
		});

		it('should return 404 if the shorten does not exist', async () => {
			await request.get('/YWJjZAo=').send().expect(404);
		});
	});
});
