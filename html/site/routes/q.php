<?php

return [
	'pattern' => 'q/(:alphanum)',
	'action' => function (string $code) {
		$site = kirby()->site();

		$home = $site->find('home');
		$page = $home->children()->filterBy('appcode', $code)->first();

		$title = $site->title();

		if(is_a($page, 'Kirby\Cms\Page')) {
			if($page->blueprint()->name() === 'pages/artwork') {
				$title = str_pad($page->num(), 2, '0', STR_PAD_LEFT) . ' ' . $page->artist()->toString() . ' | ' . $title; 
			}
			if($page->blueprint()->name() === 'pages/marker') {
				$title = $page->numcode()->toString() . ' ' . $page->markertitle()->toString() . ' | ' . $title;
			}
		};

		return $home->render(['title' => $title]);
	},
];
