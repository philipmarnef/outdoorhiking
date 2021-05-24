const CONTAINER_ID = 'app_map';

import L from 'leaflet';

export default function Map (options = {
	center: [51.180923215345445, 4.412813186645509],
	zoom: 18,
})
{
	const m = {
		init () {
			this.map = L.map(CONTAINER_ID).setView(options.center, options.zoom);
			L.tileLayer('https://api.mapbox.com/styles/v1/philipmarnef/ckp2quly704sd18lg93tg13lw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGhpbGlwbWFybmVmIiwiYSI6ImNrcDJucGdpYTFvZngycW1jbW0zbWl2YjAifQ.b6VuOrEDNBKl9LKqZhUV6w', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			}).addTo(this.map);
		},
	};

	m.init();

	return m;
};

