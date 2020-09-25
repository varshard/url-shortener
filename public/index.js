const STATE_ERROR = 'text-danger';
const STATE_SUCCESS = 'text-success';
Vue.component('copy-text', {
	props: ['shortenUrl'],
	template: `
		<div class="input-group mb-2 mr-sm-2">
			<input class="form-control" ref="shortenUrl"  v-model="shortenUrl" readonly="readonly"/>
			<div class="input-group-append">
				<button class="btn btn-dark" type="button" @click="copyShorten">copy</button>
			</div>
		</div>
		`,
	methods: {
		copyShorten() {
			this.$refs.shortenUrl.select();
			document.execCommand('copy');
		}
	}
});

const app = new Vue({
	el: '#app',
	data: {
		url: '',
		shortenUrl: '',
		result: '',
		isError: false,
		loading: false,
		state: ''
	},
	methods: {
		async processForm() {
			const errorHandler = (errorMessage) => {
				this.state = STATE_ERROR;
				this.isError = true;
				this.shortenUrl = '';
				this.result = errorMessage;
			};
			try {
				this.error = '';
				this.isError = false;
				this.loading = true;
				const resp = await fetch('/shorten', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						url: this.url
					})
				});
				switch (resp.status) {
					case 200: {
						const respBody = await resp.json();
						this.shortenUrl = respBody.shortenUrl;
						this.state = STATE_SUCCESS;
						this.result = 'Success, URL has been shorten';
						return;
					}
					case 400: {
						errorHandler('URL is invalid');
						return;
					}
					default: {
						errorHandler(await resp.text());
					}
				}
			} catch (err) {
				errorHandler(err.message);
			} finally {
				this.loading = false;
			}
		}
	}
});
