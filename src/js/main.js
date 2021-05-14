import Header from './components/header.js';

const setVH = function () {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

document.addEventListener('DOMContentLoaded', e => {
	setVH();

	const header = new Header();

	window.addEventListener('resize', e => {
		setVH();
		header.reload();
	});
});
