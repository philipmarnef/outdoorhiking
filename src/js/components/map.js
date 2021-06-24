import PubSub from 'pubsub-js';

const CONTAINER_ID = 'app_map';

import L from 'leaflet';

export default function Map (options = {})
{
	const {
		center = [180923215345445, 4.412813186645509],
		zoom = 18,
		updateEvent = 'artwork-change'
	} = options;

	const m = {
		leaflet: {},

		createMarker (latLng, num) {
			const icon = L.divIcon({
				className: 'map-marker',
				iconSize: L.point([48, 48]),
				html: `<h4>${num}</h4>`,
			});
			return L.marker(latLng, { icon });
		},

		getMarker (identifier) {
			let marker;
			switch (typeof identifier) {
				case 'object':
					marker = this.markers.find(marker => marker.leafletMarker === identifier);
					break;
				case 'string':
					if(isNaN(identifier)) {
						marker = this.markers.find(marker => marker.id === identifier);
					} else {
						marker = this.markers.find(marker => marker.num === identifier);
					}
					break;
			}
			return marker;
		},

		selectMarker (identifier) {
			const selected = this.getMarker(identifier);
			this.markers.forEach(marker => {
				marker.leafletMarker._icon.classList.remove('map-marker-active');
				if(selected === marker) {
					this.leaflet.map.panTo(marker.leafletMarker._latlng);
					marker.leafletMarker._icon.classList.add('map-marker-active');
				}
			});
		},

		addMarkers (data) {
			// reset
			if(this.leaflet.hasOwnProperty('layer')) this.leaflet.layer.remove();
			this.markers = [];

			// create layer
			this.leaflet.layer = L.layerGroup();
			data.forEach(markerData => {
				// create leaflet marker and add to store
				const leafletMarker = this.createMarker(markerData.latLng, markerData.num);
				this.markers.push({
					num: markerData.num,
					id: markerData.id,
					leafletMarker: leafletMarker,
				});

				// add on click
				leafletMarker.addEventListener('click', e => {
					// set update marker styling & pan map
					this.selectMarker(e.target);

					// publish marker change
					const marker = this.getMarker(e.target);
					PubSub.publish(updateEvent, marker.id);
				});

				// add marker to layer
				leafletMarker.addTo(this.leaflet.layer);
			});

			// add layer to map
			this.leaflet.layer.addTo(this.leaflet.map);
		},

		setLocation (latlng) {
			if(!this.leaflet.hasOwnProperty('location')) {
				const icon = L.divIcon({
					className: 'map-location',
					iconSize: L.point([32, 32]),
					html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.map-location-outer-bg{fill:#ff5c69;}.map-location-outer{fill:none;stroke:#282829;stroke-miterlimit:10;}.map-location-inner-bg{fill:#ff5c69;}.map-location-inner{fill:#282829;}</style></defs><circle class="map-location-outer-bg" cx="16" cy="16" r="14"/><circle class="map-location-outer" cx="16" cy="16" r="12"/><circle class="map-location-inner-bg" cx="16" cy="16" r="8" /><circle class="map-location-inner" cx="16" cy="16" r="6"/></svg>',
				});
				this.leaflet.location = L.marker(latlng, { icon });
				this.leaflet.location.addTo(this.leaflet.map);
			} else {
				this.leaflet.location.setLatLng(latlng);
			}
		},

		addPositionControl (leaflet) {
			if(!leaflet.hasOwnProperty('position')) {

				// custom Position control
				L.Control.Position = L.Control.extend({
					options: {
						position: 'topleft',
					},
					initialize: function (options) {
						L.Util.setOptions(this, options);
					},
					onAdd: function (map) {
						const a = L.DomUtil.create('a');
						a.title = "Show your location";
						a.setAttribute('role', 'button');
						a.setAttribute('aria-label', 'Show your location');
						a.href = '#';
						a.textContent = '*';

						a.classList.add('leaflet-control-location');

						L.DomEvent.on(a, 'click', this._setPosition, this);
						return a;
					},
					onRemove: function (map) { 
						L.DomEvent.off(a, 'click', this._setPosition, this);
					},
					_setPosition: function (event) {
						L.DomEvent.preventDefault(event);
						// get location and set the view
						if(leaflet.hasOwnProperty('location')) {
							leaflet.map.panTo(leaflet.location.getLatLng());
						}
					},
				});

				this.leaflet.position = new L.Control.Position();
				this.leaflet.position.addTo(leaflet.map);
			}
		},

		init () {
			// create map
			this.leaflet.map = L.map(CONTAINER_ID).setView(center, zoom);

			L.tileLayer('https://api.mapbox.com/styles/v1/philipmarnef/ckp2quly704sd18lg93tg13lw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGhpbGlwbWFybmVmIiwiYSI6ImNrcDJucGdpYTFvZngycW1jbW0zbWl2YjAifQ.b6VuOrEDNBKl9LKqZhUV6w', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			}).addTo(this.leaflet.map);

			// position control
			this.addPositionControl(this.leaflet);

			// locate
			this.leaflet.map.locate({
				watch: true,
				maximumAge: 1000,
				enableHighAccuracy: true,
			});

			this.leaflet.map.addEventListener('locationfound', e => {
				this.setLocation(e.latlng);
			});
		},
	};

	m.init();

	return m;
};
