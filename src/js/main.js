import App from './components/app.js';
import Poster from './components/poster.js';

const setVH = function () {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

document.addEventListener('DOMContentLoaded', e => {
	setVH();
	const poster = new Poster();
	const app = new App();

	window.addEventListener('resize', e => {
		setVH();
		poster.init();
	});
});
