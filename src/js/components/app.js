import PubSub from 'pubsub-js';
import Map from './map.js';
import Player from './player.js';

const API_URL = `/a/`,
			ATTR_CONTAINER = 'data-app',
			ATTR_BUTTON_OPEN = 'data-app-open',
			ATTR_BUTTON_CLOSE = 'data-app-close',
			ATTR_NAVIGATION = 'data-app-open-view',
			ATTR_VIEW = 'data-app-view',
			ATTR_SLOT = 'data-app-slot',
			ATTR_AUDIO = 'data-player-audio',
			SELECTOR_LANGSWITCHER = '[data-langswitch]',
			SELECTOR_POSTER = '.poster-section',
			UPDATE_EVENT = 'artwork-change';

const langprefix = function (path) {
	const matches = path.match(/^\/[a-z]{2}/);
	const lang = matches !== null ? matches[0] : '';
	return lang;
}

export default function App () {

	const a = {
		data: {},

		load (id) {
			// already loaded? render from data cache
			const key = '_' + id;
			if(this.data.hasOwnProperty(key)) {
				this.render(this.data[key]);
			}
			// not loaded? fetch data
			else {
				const url = window.location.href.replace(/q\/[a-z,A-Z,0-9]{3}(#.*)?/, '') + API_URL + id;
	
				fetch(url)
					.then(res => res.json())
					.then(json => {
						if(json && json.id) {
							// id might begin with a number, so we prefix with an underscore
							this.data['_' + id] = json;
							this.render(json);
						}
					});
			}
		},

		render (json) {
			// fill slots
			['num', 'markertitle', 'playertitle', 'text'].forEach(key => {
				const $e = document.querySelector(`[${ATTR_SLOT}=${key}]`);
				if($e) {
					$e.innerHTML = json[key] || '&nbsp;';
				}
			});

			// set map markers
			if(!this.hasOwnProperty('map')) this.map = new Map();
			this.map.addMarkers(json.markers);
			this.map.selectMarker(json.id);

			// set audio player
			const $audio = document.querySelector(`[${ATTR_AUDIO}]`);
			if($audio) {
				// init player once
				if(!this.hasOwnProperty('player')) this.player = new Player();

				// if enabled, load audio
				$audio.src = '';
	
				if(json.public === true && json.audiofile) {
					// disable for now
					$audio.src = json.audiofile;
					$audio.load();
				}
				this.player.reset();
			}

			// open app
			this.open();

			// push history
			this.updateUrl(json.id);
			// change language switcher url(s)
			this.updateLangswitcher(json.id);
		},

		open () {
			document.documentElement.classList.add('app-is-open');
			// always reset to the map view
			this.updateNav('map');
		},
		
		close () {
			document.documentElement.classList.remove('app-is-open');
		},

		onUpdateEvent (msg, id) {
			this.load(id);
		},

		updateNav (linkOrSlotId) {
			let $link = linkOrSlotId;
			if(typeof linkOrSlotId === 'string') {
				$link = document.querySelector(`[${ATTR_NAVIGATION}=${linkOrSlotId}]`);
			}

			if($link) {
				// reset nav
				this.$nav.forEach($l => {
					$l.classList.add('border-b');
					$l.classList.remove('cursor-default');
				});
				// style active link
				$link.classList.remove('border-b');
				$link.classList.add('cursor-default');
				// show linked content
				const slot = $link.getAttribute(ATTR_NAVIGATION);
				const $info = document.querySelector(`[${ATTR_VIEW}=${slot}]`);
				$info.parentElement.appendChild($info);
			}
		},

		updateUrl (id) {
			const lang = langprefix(window.location.pathname);
			const url = `${window.location.protocol}//${window.location.host}${lang}/q/${id}`;

			const marker = this.data[`_${id}`];
			let title = 'Outdoor Hiking with Sound and Other Fireworks';
			if(marker) {
				title = `${marker.num} ${marker.markertitle} | ${title}`;
			}

			window.history.pushState({}, title, url);
			document.title = title;
		},

		updateLangswitcher (id) {
			const $links = document.querySelectorAll(SELECTOR_LANGSWITCHER);
			$links.forEach($link => {
				if($link.href) {
					const path = $link.href.replace(`${window.location.protocol}//${window.location.host}`, '');
					const lang = langprefix(path);
					$link.href = `${lang}/q/${id}`;
				}
			});
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
					this.updateNav(e.currentTarget);
				});
			});

			// listen for changes
			PubSub.subscribe(UPDATE_EVENT, this.onUpdateEvent.bind(this));

			// if the url has a code, update the view
			if(window.location.pathname.indexOf('/q/') > -1) {
				const id = window.location.pathname.slice(-3);
				PubSub.publish(UPDATE_EVENT, id);
			}

			// click on the app border to open the app
			this.$container.addEventListener('click', e => {
				if(e.target === e.currentTarget) {
					// no map yet? Try to load the default
					if(!this.hasOwnProperty('map')) {
						if(this.$container.getAttribute(ATTR_CONTAINER)) {
							const id = this.$container.getAttribute(ATTR_CONTAINER);
							PubSub.publish(UPDATE_EVENT, id);
						}
					}
					// there is a map, open the app
					else {
						this.open();
					}
				}
			});

			// click on the poster to close the app
			const poster = document.querySelector(SELECTOR_POSTER);
			if(poster) {
				poster.addEventListener('click', e => {
					this.close();
				});
			}

			this.$buttons.forEach(button => {

				button.classList.add('cursor-pointer')

				button.addEventListener('click', e => {
					e.preventDefault();

					const id = e.currentTarget.getAttribute(ATTR_BUTTON_OPEN);
					if(typeof id === 'string' && id.length == 3) {
						PubSub.publish(UPDATE_EVENT, id);
					} else {
						console.error('No app id present on target');
					}

				});
			});
		}
	}

	a.init();

	return a;
}
