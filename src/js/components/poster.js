const MAX_RATIO = 0.75;
const CLASS_LANDSCAPE = 'horizontal';

export default function Poster (selector = '.poster-image')
{

	function getRatio($e) {
		return $e.offsetWidth / $e.offsetHeight;
	}

	const p = {
		poster: null,

		resize () {
			this.reset();

			const r = getRatio(this.poster);

			if(r < 1) {
				this.poster.classList.remove(CLASS_LANDSCAPE);
			} else {
				this.poster.classList.add(CLASS_LANDSCAPE);
			}

			if( r > MAX_RATIO && r < 1) {
				this.poster.style.height = null;
				this.poster.style.width = `${MAX_RATIO * this.poster.offsetHeight}px`;
			} else if(r >= 1 && r < 2 - MAX_RATIO) {
				this.poster.style.width = null;
				this.poster.style.height = `${MAX_RATIO * this.poster.offsetWidth}px`;
			}
		},

		reset () {
			this.poster.style.width = null;
			this.poster.style.height = null;
		},

		init () {
			this.poster = this.poster || document.querySelector(selector);
			if(this.poster) this.resize();
		}
	}

	p.init()

	return p;
}
