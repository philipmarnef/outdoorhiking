<?php

return [
	'pattern' => 'a/(:alphanum)',
	'action' => function (string $code) {
		$site = kirby()->site();

		$page = $site->find('home')->children()->filterBy('appcode', $code)->first();

		if(!is_a($page, 'Kirby\Cms\Page')) return false;

		$location = $page->location()->toLocation();
		$audiofile = $page->audiofile()->isNotEmpty() ? $page->audiofile()->toFile()->url() : '';

		$data = [
			'code'=> $code,
			'num' => str_pad($page->num(), 2, '0', STR_PAD_LEFT),
			'artist' => $page->artist()->value(),
			'title' => $page->audiotitle()->value(),
			'text' => $page->text()->kt()->value(),
			'audiofile' => $audiofile,
			'm' => $page->minutes()->toInt(),
			's' => $page->seconds()->toInt(),
			'lat' => $location->lat()->value(),
			'lon' => $location->lon()->value(),
		];

		return $data;

	},
];
