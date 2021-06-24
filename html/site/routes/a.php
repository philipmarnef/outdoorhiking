<?php

return [
	'pattern' => 'a/(:alphanum)',
	'language' => '*',
	'action' => function ($language, string $id) {
		$site = kirby()->site();
		// visit the correct language version
		$home = $site->visit('home', $language);

		// all markers
		$children = $home->children();

		// marker array
		$markers = [];
		
		foreach($children as $page) {
			$num = '';
			if($page->blueprint()->name() === 'pages/artwork') $num = str_pad($page->num(), 2, '0', STR_PAD_LEFT);
			if($page->blueprint()->name() === 'pages/marker' && $page->numcode()->exists()) $num = $page->numcode()->toString();
			$location = $page->location()->toLocation();
			$markers[] = [
				'num' => $num,
				'id' => $page->appcode()->value,
				'latLng' => [
					$location->lat()->toFloat(),
					$location->lon()->toFloat(),
				],
			];
		}

		// current work
		$page = $children->filterBy('appcode', $id)->first();

		// not found?
		if(!is_a($page, 'Kirby\Cms\Page')) return false;

		// data
		if($page->blueprint()->name() === 'pages/artwork') {
			$num = str_pad($page->num(), 2, '0', STR_PAD_LEFT);
			$markertitle = $page->artist()->toString();
			$playertitle = $page->audiotitle()->value();
			$audiofile = $page->audiofile()->isNotEmpty() ? $page->audiofile()->toFile()->url() : '';
			$m = $page->minutes()->toInt();
			$s = $page->seconds()->toInt();
		} 
		elseif($page->blueprint()->name() === 'pages/marker') {
			$num = $page->numcode()->toString();
			$markertitle = $page->markertitle()->toString();
			$playertitle = $page->playertitle()->toString();
		} 

		$text = $page->text()->kt()->toString();

		if($location = $page->location()->toLocation()) {
			$lat = $location->lat()->value();
			$lon = $location->lon()->value();
		}

		// build data array
		$data = [
			'public' => option('philipmarnef.OH.public') ?? false,
			'id'=> $id,
			'num' => $num ?? '',
			'markertitle' => $markertitle ?? '',
			'playertitle' => $playertitle ?? '',
			'text' => $text,
			'audiofile' => $audiofile ?? '',
			'm' => $m ?? 0,
			's' => $s ?? 0,
			'lat' => $lat ?? null,
			'lon' => $lon ?? null,
			'markers' => $markers,
		];

		return $data;

	},
];
