class UrlShortenerService {
	constructor(models) {
		this.models = models;
		const { Url, Sequence } = this.models;
		this.UrlModel = Url;
		this.SequenceModel = Sequence;
	}

	async shorten(url) {
		const encoded = encodeURI(url);

		const urlDoc = await this.UrlModel.findByUrl(encoded);
		if (urlDoc) {
			return urlDoc;
		}

		const seq = await this.SequenceModel.increment();
		const urlModel = new this.UrlModel({ url: encoded, id: seq.value });

		return urlModel.save();
	}

	async expand(shortenUrl) {
		return await this.UrlModel.findByShortenUrl(shortenUrl);
	}
}

module.exports = UrlShortenerService;
