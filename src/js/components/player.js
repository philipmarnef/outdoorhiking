const ATTR_AUDIO = 'data-player-audio',
			ATTR_CONTROL = 'data-player-control',
			CLASS_PAUSE = 'player-button-pause';


const secondsToClocktime = function (duration) {
	const minutes = ('00' + Math.floor(duration / 60)).slice(-2);
	const seconds = ('00' + Math.ceil(duration % 60)).slice(-2);
	return `${minutes}:${seconds}`;

}

export default function Player ()
{

	const $audio = document.querySelector(`[${ATTR_AUDIO}]`);
	const $playpause = document.querySelector(`[${ATTR_CONTROL}=playpause]`);
	const $rewind = document.querySelector(`[${ATTR_CONTROL}=rewind]`);
	const $seek = document.querySelector(`[${ATTR_CONTROL}=seek]`);
	const $currentTime = document.querySelector(`[${ATTR_CONTROL}=currentTime]`);
	const $totalTime = document.querySelector(`[${ATTR_CONTROL}=totalTime]`);

	const p = {
		listening: false,

		reset () {
			// reset play head
			$audio.pause();
			// pausing this way doesn't always fire the pause event :-(
			if($playpause) $playpause.classList.remove(CLASS_PAUSE);

			// rewind play head
			$audio.currentTime = 0;
			// set total time
			$totalTime.textContent = $audio.duration ? secondsToClocktime($audio.duration) : '00:00';
		},

		init () {

			if(!$audio) return;

			$audio.addEventListener('loadedmetadata', e => {

				this.reset();

				// add control listeners only once!
				if(!this.listening) {

					// play/pause button
					if($playpause) {

						$playpause.addEventListener('click', e => {
							if($audio.getAttribute(ATTR_AUDIO) !== 'disabled') {
								if($audio.paused) {
									$audio.play();
								} else {
									$audio.pause();
								}
							}
						});

						$audio.addEventListener('play', e => {
							$playpause.classList.add(CLASS_PAUSE);
						});
						
						$audio.addEventListener('pause', e => {
							$playpause.classList.remove(CLASS_PAUSE);
						});
	
					};
		
					// rewind button
					if($rewind) $rewind.addEventListener('click', e => {
						if($audio.getAttribute(ATTR_AUDIO) !== 'disabled') $audio.currentTime = 0;
					});
	
					// seek bar
					if($seek) {
						// update play head on user input
						$seek.addEventListener('input', e => {
							$audio.currentTime = $audio.duration * $seek.value / 100;
						});
		
						// update while playing
						$audio.addEventListener('timeupdate', e => {
							$seek.value = parseInt(100 * $audio.currentTime / $audio.duration);
							$currentTime.textContent = secondsToClocktime($audio.currentTime);
						});
					}
		
					this.listening = true;
				}

			});

		},
	};

	p.init();

	return p;
};
