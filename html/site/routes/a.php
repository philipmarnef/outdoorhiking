<?php

return [
	'pattern' => 'a/(:alphanum)',
	'action' => function (string $id) {
		$site = kirby()->site();

		// all artworks
		$works = $site->find('home')->children();

		// marker array
		$markers = [];
		
		foreach($works as $work) {
			$location = $work->location()->toLocation();
			$markers[] = [
				'num' => str_pad($work->num(), 2, '0', STR_PAD_LEFT),
				'id' => $work->appcode()->value,
				'latLng' => [
					$location->lat()->toFloat(),
					$location->lon()->toFloat(),
				],
			];
		}

		// current work
		$page = $works->filterBy('appcode', $id)->first();

		// not found?
		if(!is_a($page, 'Kirby\Cms\Page')) return false;

		$location = $page->location()->toLocation();
		$audiofile = $page->audiofile()->isNotEmpty() ? $page->audiofile()->toFile()->url() : '';
		
		// build data array
		$data = [
			'id'=> $id,
			'num' => str_pad($page->num(), 2, '0', STR_PAD_LEFT),
			'artist' => $page->artist()->value(),
			'title' => $page->audiotitle()->value(),
			'text' => $page->text()->kt()->value(),
			'audiofile' => $audiofile,
			'm' => $page->minutes()->toInt(),
			's' => $page->seconds()->toInt(),
			'lat' => $location->lat()->value(),
			'lon' => $location->lon()->value(),
			'markers' => $markers,
		];

		return $data;

	},
];
