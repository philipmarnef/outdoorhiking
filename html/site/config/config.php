<?php

return [
	'debug' => false,
	'bnomei.fingerprint.query' => false,
	'sylvainjule.locator.mapbox.id' => 'mapbox/outdoors-v11',
	'philipmarnef.OH.public' => true,
	'routes' => [
		require dirname(__DIR__) . '/routes/a.php',
		require dirname(__DIR__) . '/routes/q.php',
	]
];
