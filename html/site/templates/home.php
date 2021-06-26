<!DOCTYPE html>
<html lang="<?= $kirby->language()->code() ?>">
<?= snippet('head') ?>

<body class="text-black bg-white">

	<main class="relative">

		<section class="poster-section fixed top-0 z-10 flex flex-col h-screen bg-white">
			<header class="relative flex-grow-0 flex-shrink w-full px-ws pt-4 lg:pt-6 pb-2 text-poster bg-white">
				<h1>Outdoor Hiking with Sound &ndash;<br>&amp; Other Fireworks</h1>
				<h2 class="text-right" data-header>26.06.2021&ndash;&thinsp;03.10.2021</h2>
				<div class="fireworks">
					<div class="fireworks-flash"></div>
					<div class="fireworks-flash"></div>
					<div class="fireworks-flash"></div>
					<div class="fireworks-flash"></div>
					<div class="fireworks-flash"></div>
				</div>
			</header>
			<div class="flex justify-center items-center w-full h-full px-ws">
				<div class="poster-image relative w-full h-full" data-poster-image></div>
			</div>
			<?= $langparam = $kirby->language()->code() === 'nl' ? '' : $kirby->language()->code() . '/' ?>
			<ul class="poster-footer flex-grow-0 flex-shrink w-full px-ws text-poster">
				<li class="hidden tall:block landscape:block leading-none">
					<a class="inline-block w-3/12" href="/<?= $langparam ?>q/C98">A:</a><a href="/<?= $langparam ?>q/C98">Park Den Brandt</a>
				</li>
				<li class="hidden tall:block landscape:block leading-none border-black border-t-2">
					<a class="inline-block w-3/12" href="/<?= $langparam ?>q/gJH">B:</a><a href="/<?= $langparam ?>q/gJH">Middelheimpark</a>
				<li class="hidden tall:block landscape:block leading-none border-black border-t-2">
					<a class="inline-block w-3/12" href="/<?= $langparam ?>q/NRq">C:</a><a href="/<?= $langparam ?>q/NRq">Park Vogelenzang</a>
				</li>
				<li class="tall:hidden landscape:hidden leading-none text-center">Nachtegalenpark</li>
			</ul>
		</section>

		<section class="info-section fixed top-0 z-20 w-full h-screen overflow-y-auto">
			<div class="min-h-screen mt-vh landscape:mt-0 p-ws bg-green">
				<nav class="mb-ws-half text-sm lg:text-base">
					<?= snippet('language-menu') ?>
				</nav>
				<div class="xl:columns-2 bodytext hyphens">
					<?= $page->intro()->kt() ?>
					<div class="relative pb-lb pl-10 xl:pl-12 mt-lb">
						<figure class="absolute top-0 left-0">
							<img class="w-7 xl:w-9" src="/assets/images/info.svg" alt="">
						</figure>
						<?= $page->info()->kt() ?>
					</div>
				</div>
				<h3 class="landscape:hidden pl-10 xl:pl-12 mt-lb bodytext"><?= t('participating') ?></h3>
				<div class="my-lb pr-4 landscape:pr-2">
					<table class="w-full lg:text-lg">
					<?php foreach(page('home')->children()->template('artwork') as $work): ?>
						<tr class="align-top" data-app-open="<?= $work->appcode() ?>">
							<td class="w-10 lg:w-12 xl:w-16"><?= str_pad($work->num(), 2, '0', STR_PAD_LEFT) ?></td>
							<td><?= $work->artist() ?></td>
							<td class="text-right"><?= $work->minutes() ?>:<?= str_pad($work->seconds(), 2, '0', STR_PAD_LEFT) ?></td>
						</tr>
					<?php endforeach ?>
					</table>
				</div>
				<footer class="grid grid-flow-row-dense grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-5 text-sm">
					<div class="space-y-lb">
						<?= $page->credits()->kt() ?>
					</div>
					<div class="xl:col-start-3 space-y-lb">
						<?= $page->thanks()->kt() ?>
					</div>
					<div class="col-span-2 xl:col-span-1 grid grid-cols-2 xl:flex flex-wrap items-between">
						<div class="space-y-lb">
							<?= $page->support()->kt() ?>
						</div>
						<div class="flex justify-between items-end xl:w-full">
						<?php foreach($page->partners()->toStructure() as $partner): ?>
						<?php if($partner->website()->isNotEmpty()): ?>
							<a href="<?= $partner->website() ?>" target="_blank">
								<img class="h-8" src="<?= $partner->logo()->toFile()->url() ?>" alt="">
							</a>
						<?php else: ?>
							<span>
								<img class="h-8" src="<?= $partner->logo()->toFile()->url() ?>" alt="">
							</span>
						<?php endif ?>
						<?php endforeach ?>
						</div>
					</div>
				</footer>
			</div>
		</section>

		<section class="app-section fixed z-0 h-screen p-ws bg-red" data-app="<?php if($page->defaultmarker()->isNotEmpty()) print $page->defaultmarker()->toPage()->appcode(); ?>">
			<div class="flex flex-col h-full lg:text-lg">
				<header class="w-full mb-ws-half leading-snug">
					<div class="flex justify-between items-start">
						<h3 class="flex justify-start"><span class="mr-ws" data-app-slot="num">00</span><span data-app-slot="markertitle">Start</span></h3>
						<button data-app-close>sluit</button>
					</div>
					<h4 data-app-slot="playertitle"></h4>
					<nav>
						<ul class="flex justify-between">
							<li><a class="inline-block border-b border-black" href="#app_info" data-app-open-view="text"><?= t('about') ?></a></li>
							<li><a class="inline-block border-black cursor-default" href="#app_map" data-app-open-view="map"><?= t('map') ?></a></li>
							<li><a class="inline-block border-b border-black" href="#app_help" data-app-open-view="help"><?= t('help') ?></a></li>
						</ul>
					</nav>
				</header>
				<div class="relative w-full h-full">
					<div id="app_info" class="bg-red absolute inset-0 z-2 w-full h-full overflow-hidden" data-app-view="text">
						<nav class="mb-ws-half text-sm lg:text-base">
							<?= snippet('language-menu') ?>
						</nav>
						<article class="h-full pb-2 overflow-y-scroll scrollbars-none bodytext text-base" data-app-slot="text"></article>
					</div>
					<div id="app_help" class="bg-red absolute inset-0 z-2 w-full h-full overflow-hidden" data-app-view="help">
						<nav class="mb-ws-half text-sm lg:text-base">
							<?= snippet('language-menu') ?>
						</nav>
						<article class="h-full overflow-y-scroll scrollbars-none bodytext text-base">
							<?= $page->help()->kt() ?>
						</article>
					</div>
					<div class="bg-red absolute inset-0 z-2 w-full h-full" data-app-view="map">
						<div id="app_map" class="absolute inset-0 w-full h-full border-black border-2 bg-red"></div>
					</div>
				</div>
				<div class="player w-full mt-ws-half landscape:mt-ws">
					<div class="bodytext text-base">
						<?php if(option('philipmarnef.OH.public') !== true): ?>
						<p class="mb-ws"><?= t('comingsoon') ?></p>
						<?php else: ?>
						<p class="mb-ws hidden" data-player-message><?= t('notinrange') ?></p>
						<?php endif ?>
					</div>
					<audio data-player-audio></audio>
					<div class="player-buttons flex flex-wrap justify-between w-full text-base leading-none">
						<button class="player-button player-button-rewind" data-player-control="rewind">rewind</button>
						<button class="player-button player-button-play mx-10" data-player-control="playpause">play</button>
						<span class="player-button landscape:hidden"></span>
						<div class="w-full landscape:w-auto flex-grow">
							<div class="player-seek w-full mt-ws-half landscape:mt-0 bg-transparent border-black">
								<input class="player-seek-progress" type="range" min="0" max="100" value="0" step="1" data-player-control="seek" >
							</div>
							<div class="player-time flex justify-between w-full pt-2">
								<span data-player-control="currentTime">00:00</span><span data-player-control="totalTime">00:00</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	</main>

</body>

</html>
