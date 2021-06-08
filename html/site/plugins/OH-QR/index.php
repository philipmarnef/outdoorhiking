<?php

class MarkerPage extends Page
{
	public static function create (array $props):Page
	{
		$dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		$max = strlen($dict);
		$code = '';
		for ($i = 0; $i < 3; $i++) {
			$code .= $dict[random_int(0, $max - 1)];
		}
		$props['content']['appcode'] = $code;
		return parent::create($props);
	}
}

Kirby::plugin('philipmarnef/OH-QR', [
	'pageModels' => [
		'artwork' => 'MarkerPage',
		'marker' => 'MarkerPage',
	],
	'hooks' => [
		'page.update:after' => function ($newPage, $oldPage) {
			if(!$newPage->appcode()->exists() || $newPage->appcode()->isNotEmpty()) return;

			$dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			$max = strlen($dict);
			$code = '';
			for ($i = 0; $i < 3; $i++) {
				$code .= $dict[random_int(0, $max - 1)];
			}
			kirby()->impersonate('kirby');
			$newPage->update([
				'appcode' => $code,
			]);
		},
	],
]);
