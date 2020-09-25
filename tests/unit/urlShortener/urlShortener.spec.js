const UrlShortener = require('../../../src/urlShortener');

describe('UrlShortener', () => {
	describe('encode', () => {
		it('should encode id to base64', () => {
			const input = '128482';
			const encoded = UrlShortener.encode(input);

			expect(encoded).toBe('MTI4NDgy');
		});
	});

	describe('decode', () => {
		it('should decode an encoded id', () => {
			const input = 'MTI4NDgy';
			const decoded = UrlShortener.decode(input);
			expect(decoded).toBe('128482');
		});
	});
});
