import PubSub from 'pubsub-js';
import Map from './map.js';
import Player from './player.js';

const URL = `/a/`,
			ATTR_CONTAINER = 'data-app',
			ATTR_BUTTON_OPEN = 'data-app-open',
			ATTR_BUTTON_CLOSE = 'data-app-close',
			ATTR_NAVIGATION = 'data-app-view',
			ATTR_SLOT = 'data-app-slot',
			ATTR_AUDIO = 'data-player-audio',
			UPDATE_EVENT = 'artwork-change';

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
				const url = window.location.href.replace(/q\/[a-z,A-Z,0-9]{3}(#.*)?/, '') + URL + id;
	
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
			['num', 'artist', 'title', 'text'].forEach(key => {
				const $e = document.querySelector(`[${ATTR_SLOT}=${key}]`);
				if($e) {
					$e.innerHTML = json[key];
				}
			});

			// set map markers
			if(!this.hasOwnProperty('map')) this.map = new Map();
			this.map.addMarkers(json.markers);
			this.map.selectMarker(json.id);

			// set audio player source
			const $audio = document.querySelector(`[${ATTR_AUDIO}]`);
			if($audio && json.audiofile) $audio.src = json.audiofile;

			// set up player
			if(!this.hasOwnProperty('player')) this.player = new Player();

			// open app
			this.open();

			// push history
			this.updateUrl(json.id);
		},

		open () {
			this.$container.style.left = '0';
			// always reset to the map view
			this.updateNav('map');
		},

		close () {
			console.log('close');
			this.$container.style.left = null;
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
				const $info = document.querySelector(`[${ATTR_SLOT}=${slot}]`);
				$info.parentElement.appendChild($info);
			}
		},

		updateUrl(id) {
			const url = `${window.location.protocol}//${window.location.host}/q/${id}`;
			window.history.pushState({}, '', url);
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
