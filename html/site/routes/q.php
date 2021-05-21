<?php

return [
	'pattern' => 'q/(:alphanum)',
	'action' => function (string $code) {
		$site = kirby()->site();

		$home = $site->find('home');
		$work = $home->children()->filterBy('appcode', $code)->first();

		$title = $site->title();
		if(is_a($work, 'Kirby\Cms\Page')) {
			$title = str_pad($work->num(), 2, '0', STR_PAD_LEFT) . ' ' . $work->artist() . ' – ' . $work->audiotitle() . ' | ' . $title;
		};

		return $home->render(['title' => $title]);
	},
];
