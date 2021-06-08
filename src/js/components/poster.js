const MAX_RATIO = 0.75,
			RESIZE_THRESHOLD = 480,
			CLASS_LANDSCAPE = 'horizontal';

export default function Poster ( options = { 
	imageAttribute: 'data-poster-image',
	scrollerSelector: '.info-section',
})
{
	const { imageAttribute, scrollerSelector } = options;

	function getRatio($e) {
		return $e.offsetWidth / $e.offsetHeight;
	}

	const p = {
		poster: null,
		scroller: null,

		resize () {
			const w = window.innerWidth;

			// don't resize when the mobile browser UI changes
			if(this.w < RESIZE_THRESHOLD && w < RESIZE_THRESHOLD ) return;

			this.w = w;
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
			this.poster = this.poster || document.querySelector(`[${imageAttribute}]`);
			if(this.poster) this.resize();

			// listen on info section scroll
			this.scroller = this.scroller || document.querySelector(scrollerSelector);
			if(this.scroller) {
				// max scroll amount
				const scrollMax = this.scroller.scrollHeight - this.scroller.clientHeight;
				this.scroller.addEventListener('scroll', e => {
					// get scroll position on a scale of 1 to 10, twice
					const scrollTen = Math.abs(Math.ceil(this.scroller.scrollTop / scrollMax * 21)  - 11);

					// set scroll position on attribute (and change image with CSS)
					this.poster.setAttribute(imageAttribute, scrollTen);
				})
			}
		}
	}

	p.init()

	return p;
}
