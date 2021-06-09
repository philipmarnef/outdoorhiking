<?php

return [
	'pattern' => 'q/(:alphanum)',
	'language' => '*',
	'action' => function ($language, string $code) {
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

		$url = $home->url($language->code()) . '/q/' . $code;

		return Page::factory([
			'slug' => 'q/' . $code,
			'template' => 'home',
			'files' => $home->files()->toArray(),
			'content' => $home->content()->toArray(),
			'url' => $url,
		]);
	},
];
