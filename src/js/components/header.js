const CLASS_COLLAPSED = 'collapsed',
			CLASS_EXPANDED	 = 'expanded';

export default function Header (selector)
{

	function isPortrait() {
		return document.documentElement.clientHeight > document.documentElement.clientWidth;
	}

	const h = {
		selector: selector || '[data-header]',
		threshold: 10,

		$targets: null,
		collapsed: false,

		scrolled () {
			return document.documentElement.scrollTop >= this.threshold;
		},

		setClasses () {
			if(!isPortrait()) return;

			if(!this.collapsed && this.scrolled()) {
				// collapse
				this.$targets.forEach($target => {
					$target.classList.add(CLASS_COLLAPSED);
					$target.classList.remove(CLASS_EXPANDED);
				});
				this.collapsed = true;
				console.log('collapsed');
			} else if(this.collapsed && !this.scrolled()) {
				// expand
				this.$targets.forEach($target => {
					$target.classList.remove(CLASS_COLLAPSED);
					$target.classList.add(CLASS_EXPANDED);
				});
				this.collapsed = false;
				console.log('expanded');
			}
		},

		reload () {
			this.threshold = window.innerHeight - this.$targets.item(0).clientHeight;
		},

		init () {
			this.$targets = document.querySelectorAll(this.selector);

			this.threshold = window.innerHeight - this.$targets.item(0).clientHeight;

			document.addEventListener('scroll', this.setClasses.bind(this));
		}
	};

	h.init();

	return h;
};
