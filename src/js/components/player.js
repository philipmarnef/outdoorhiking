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
	const p = {
		init () {
			const $audio = document.querySelector(`[${ATTR_AUDIO}]`);
			const $playpause = document.querySelector(`[${ATTR_CONTROL}=playpause]`);
			const $rewind = document.querySelector(`[${ATTR_CONTROL}=rewind]`);
			const $seek = document.querySelector(`[${ATTR_CONTROL}=seek]`);
			const $currentTime = document.querySelector(`[${ATTR_CONTROL}=currentTime]`);
			const $totalTime = document.querySelector(`[${ATTR_CONTROL}=totalTime]`);

			$audio.addEventListener('loadedmetadata', e => {
				// set total time
				$totalTime.textContent = secondsToClocktime($audio.duration);

				// play/pause button
				if($playpause) $playpause.addEventListener('click', e => {
					const playing = 'playing';
					const paused = 'paused';
					if($audio.getAttribute(ATTR_AUDIO) === playing) {
						$audio.setAttribute(ATTR_AUDIO, paused);
						$playpause.classList.remove(CLASS_PAUSE);
						$audio.pause();
					} else {
						$audio.play();
						$audio.setAttribute(ATTR_AUDIO, playing);
						$playpause.classList.add(CLASS_PAUSE);
					}
				});
	
				// rewind button
				if($rewind) $rewind.addEventListener('click', e => {
					$audio.currentTime = 0;
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
	
			});

		},
	};

	p.init();

	return p;
};
