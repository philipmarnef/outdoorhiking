import PubSub from "pubsub-js";

const ATTR_AUDIO          = 'data-player-audio',
	  	ATTR_CONTROL        = 'data-player-control',
	  	ATTR_MESSAGE        = 'data-player-message',
	  	CLASS_PAUSE         = 'player-button-pause',
			MSG_NOTSUPPORTED	  = 'not-supported',
			MSG_NOLOCATION	    = 'no-location',
			MSG_LOCATIONERROR	  = 'location-error',
			MSG_PROXIMITY	      = 'out-of-range',
			MSG_NOFILE	  	    = 'no-audiofile',
	  	PROXIMITY_EVENT     = 'in-range',
			LOCATIONERROR_EVENT = 'location-error',
	  	DEBUG               = false;


const secondsToClocktime = function (duration) {
	const minutes = ('00' + Math.floor(duration / 60)).slice(-2);
	const seconds = ('00' + Math.ceil(duration % 60)).slice(-2);
	return `${minutes}:${seconds}`;

}

export default function Player ()
{

	const p = {

		$audio:       document.querySelector(`[${ATTR_AUDIO}]`),
		$playpause:   document.querySelector(`[${ATTR_CONTROL}=playpause]`),
		$rewind:      document.querySelector(`[${ATTR_CONTROL}=rewind]`),
		$seek:        document.querySelector(`[${ATTR_CONTROL}=seek]`),
		$currentTime: document.querySelector(`[${ATTR_CONTROL}=currentTime]`),
		$totalTime:   document.querySelector(`[${ATTR_CONTROL}=totalTime]`),
		$message:     document.querySelector(`[${ATTR_MESSAGE}]`),

		listening: false,

		reset () {
			// reset play head
			this.$audio.pause();
			// pausing this way doesn't always fire the pause event :-(
			if(this.$playpause) this.$playpause.classList.remove(CLASS_PAUSE);

			// rewind play head
			this.$audio.currentTime = 0;
			// set total time
			this.$totalTime.textContent = '00:00';
		},

		setDuration () {

			const _player = new Audio(this.$audio.getAttribute('src'));
			_player.addEventListener("durationchange", e => {
				if (e.target.duration != Infinity) {
					let duration = e.target.duration;
					_player.remove();
					if(DEBUG) console.log('Audio duration = ', duration);
					this.$totalTime.textContent =secondsToClocktime(duration);
				};
			}, false);      
			_player.load();
			_player.currentTime = 24*60*60; //fake big time
			_player.volume = 0;
			_player.play();
		},

		setErrorMessage (msg) {
			this.$message.setAttribute(ATTR_MESSAGE, msg);
		},

		activate (e, inRange) {
			if(DEBUG) console.log('Trying to activate the player');

			// not in range? Show the message & deactivate the player
			if(!inRange) {
				if(DEBUG) console.log('Not in range');
				this.setErrorMessage(MSG_PROXIMITY);
				this.$audio.setAttribute('disabled', '');
				return;
			}
			// in range? Hide the message & activate the player
			else {
				if(DEBUG) console.log('In range');
				this.setErrorMessage('');
				this.$audio.removeAttribute('disabled');
			}

			// Already activated? Do nothing
			if(this.$audio.getAttribute(ATTR_AUDIO) === '') {
				if(DEBUG) console.log('Player src already set');
				return;
			}

			// Set src & reload
			const url = this.$audio.getAttribute(ATTR_AUDIO);
			if(DEBUG) console.log('Url = ', url);
			if(url) {
				this.$audio.src = url;
				this.$audio.setAttribute(ATTR_AUDIO, '');
				if(DEBUG) console.log('Loading audio ', this.$audio.src);
				this.$audio.load();
			} else {
				this.setErrorMessage(MSG_NOFILE);
			}
		},

		locationErrorHandler(e, code) {
			// only set an error message if the player isn't active yet
			if(this.$audio.getAttribute('disabled') === '') {
				switch(code) {
					case 0:
						this.setErrorMessage(MSG_NOTSUPPORTED);
						break;
					case 1:
						this.setErrorMessage(MSG_NOLOCATION);
						break;
					default:
						this.setErrorMessage(MSG_LOCATIONERROR);
						break;
				}
			}
		},

		loadHandler (e) {

			if(DEBUG) console.log('Audio metadata loaded');
			// reset, then disable the player
			this.reset();
			this.$audio.setAttribute('disabled', '');
			// update the track duration
			this.setDuration();

			// add control listeners only once!
			if(!this.listening) {

				// play/pause button
				if(this.$playpause) {

					this.$playpause.addEventListener('click', e => {
						// disabled? do nothing
						if(this.$audio.hasAttribute('disabled')) return;

						if(this.$audio.paused) {
							this.$audio.play();
						} else {
							this.$audio.pause();
						}
					});

					this.$audio.addEventListener('play', e => {
						this.$playpause.classList.add(CLASS_PAUSE);
					});
					
					this.$audio.addEventListener('pause', e => {
						this.$playpause.classList.remove(CLASS_PAUSE);
					});

				};
	
				// rewind button
				if(this.$rewind) this.$rewind.addEventListener('click', e => {
					// disabled? do nothing
					if(this.$audio.hasAttribute('disabled')) return;

					this.$audio.currentTime = 0;
				});

				// seek bar
				if(this.$seek) {
					// update play head on user input
					this.$seek.addEventListener('input', e => {
						this.$audio.currentTime = this.$audio.duration * this.$seek.value / 100;
					});
	
					// update while playing
					this.$audio.addEventListener('timeupdate', e => {
						this.$seek.value = parseInt(100 * this.$audio.currentTime / this.$audio.duration);
						this.$currentTime.textContent = secondsToClocktime(this.$audio.currentTime);
					});
				}
	
				this.listening = true;
			}

		},

		init () {

			if(!this.$audio) return;

			// set location errors
			PubSub.subscribe(LOCATIONERROR_EVENT, this.locationErrorHandler.bind(this));

			// activate the player only if the user is within distance
			PubSub.subscribe(PROXIMITY_EVENT, this.activate.bind(this));

			this.$audio.addEventListener('loadedmetadata', this.loadHandler.bind(this));

		},
	};

	p.init();

	return p;
};
