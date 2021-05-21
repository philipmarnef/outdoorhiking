const URL = `/a/`,
			ATTR_CONTAINER = 'data-app',
			ATTR_BUTTON_OPEN = 'data-app-open',
			ATTR_BUTTON_CLOSE = 'data-app-close',
			ATTR_NAVIGATION = 'data-app-view',
			ATTR_SLOT = 'data-app-slot',
			ATTR_AUDIO = 'data-player-audio',
			ATTR_AUDIO_SRC = 'data-player-audio-src';

export default function App () {

	const a = {
		data: {},

		load (code) {
			// already loaded?
			const key = '_' + code;
			if(this.data.hasOwnProperty(key)) {
				console.log('Cached');
				this.render(this.data[key]);
			}
			// fetch data
			else {
				const url = window.location.href.replace(/q\/[a-z,A-Z,0-9]{3}(#.*)/, '') + URL + code;
	
				fetch(url)
					.then(res => res.json())
					.then(json => {
						if(json && json.code) {
							// code might begin with a number, so we prefix with an underscore
							this.data['_' + code] = json;
							this.render(json);
						}
					});
			}
		},

		render (json) {
			// fill slots
			['num', 'artist', 'title'].forEach(key => {
				const $e = document.querySelector(`[${ATTR_SLOT}=${key}]`);
				if($e) {
					$e.textContent = json[key];
				}
			});

			// set audio player source
			const $source = document.querySelector(`[${ATTR_AUDIO_SRC}]`);
			if($source && json.audiofile) $source.src = json.audiofile;

			// open app
			this.open();

			// push history
		},

		open () {
			this.$container.style.left = '0';
		},

		close () {
			console.log('close');
			this.$container.style.left = null;
		},

		init () {
			// get DOM elements
			this.$container = document.querySelector(`[${ATTR_CONTAINER}]`);
			this.$close = document.querySelector(`[${ATTR_BUTTON_CLOSE}]`);
			this.$buttons = document.querySelectorAll(`[${ATTR_BUTTON_OPEN}]`);

			// arm close button
			this.$close.addEventListener('click', this.close.bind(this));

			// set app navigation
			this.$nav = document.querySelectorAll(`[${ATTR_NAVIGATION}]`);
			this.$nav.forEach($link => {
				$link.addEventListener('click', e => {
					e.preventDefault();

					// reset nav
					this.$nav.forEach($l => {
						$l.classList.add('border-b');
						$l.classList.remove('cursor-default');
					});
					// style active link
					e.currentTarget.classList.remove('border-b');
					e.currentTarget.classList.add('cursor-default');
					// show linked content
					const slot = e.currentTarget.getAttribute(ATTR_NAVIGATION);
					const $info = document.querySelector(`[${ATTR_SLOT}=${slot}]`);
					$info.parentElement.appendChild($info);
				});
			});

			// arm app triggers
			this.$buttons.forEach(button => {

				button.classList.add('cursor-pointer')

				button.addEventListener('click', e => {
					e.preventDefault();
					
					const code = e.currentTarget.getAttribute(ATTR_BUTTON_OPEN);
					if(typeof code === 'string' && code.length == 3) {
						this.load(code);
					} else {
						console.error('No app code present on target');
					}
				})
			});
		}
	}

	a.init();

	return a;
}
