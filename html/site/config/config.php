<?php

return [
	'debug' => true,
	'sylvainjule.locator.mapbox.id' => 'mapbox/outdoors-v11',
	'sylvainjulie.locator.mapbox.token' => 'pk.eyJ1IjoicGhpbGlwbWFybmVmIiwiYSI6ImNrcDJvcGY2cjA3bW8ydW1raGhjbDljYzIifQ.fOn-sV57EV3pVYllE5gPNQ',
	'routes' => [
		require dirname(__DIR__) . '/routes/a.php',
		require dirname(__DIR__) . '/routes/q.php',
	]
];
