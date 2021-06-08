<!DOCTYPE html>
<html lang="<?= $kirby->languageCode() ?>">
<?= snippet('head') ?>

<body class="text-black bg-red">

	<main class="relative">

		<section class="poster-section fixed top-0 z-10 flex flex-col h-screen bg-white">
			<header class="flex-grow-0 flex-shrink w-full px-ws pt-4 pb-2 text-poster bg-white">
				<h1>Outdoor Hiking with Sound &ndash;<br>&amp; Other Fireworks</h1>
				<h2 class="text-right" data-header>26.06.2021&ndash;&thinsp;03.10.2021</h2>
			</header>
			<div class="flex justify-center items-center w-full h-full px-ws">
				<div class="poster-image relative w-full h-full" data-poster-image></div>
			</div>
			<ul class="poster-footer flex-grow-0 flex-shrink w-full px-ws text-poster">
				<li class="hidden tall:block landscape:block leading-none"><span class="inline-block w-3/12">A:</span><span>Park Den Brandt</span></li>
				<li class="hidden tall:block landscape:block leading-none border-black border-t-2"><span class="inline-block w-3/12">B:</span><span>Middelheimpark</span></li>
				<li class="hidden tall:block landscape:block leading-none border-black border-t-2"><span class="inline-block w-3/12">C:</span><span>Park Vogelenzang</span></li>
				<li class="tall:hidden landscape:hidden text-center">Nachtegalenpark</li>
			</ul>
		</section>

		<section class="info-section fixed top-0 z-20 w-full h-screen overflow-y-auto">
			<div class="min-h-screen mt-vh landscape:mt-0 p-ws bg-green">
				<div class="xl:columns-2 bodytext hyphens">
					<?= $page->intro()->kt() ?>
					<div class="relative pb-lb pl-12 mt-lb">
						<figure class="absolute top-0 left-0">
							<img class="w-9" src="/assets/images/info.svg" alt="">
						</figure>
						<?= $page->info()->kt() ?>
					</div>
				</div>
				<h3 class="landscape:hidden pl-12 mt-lb bodytext">Deelnemende<br>kunstenaars:</h3>
				<div class="my-lb">
					<table class="w-full lg:text-lg">
					<?php foreach($page->children() as $work): ?>
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

		<section class="app-section fixed z-0 h-screen p-ws" data-app>
			<div class="flex flex-col h-full lg:text-lg">
				<header class="w-full mb-ws-half leading-snug">
					<div class="flex justify-between items-start">
						<h3 class="flex justify-start"><span class="mr-ws" data-app-slot="num">00</span><span data-app-slot="markertitle">Start</span></h3>
						<button data-app-close>sluit</button>
					</div>
					<h4 data-app-slot="playertitle">&nbsp;</h4>
					<nav>
						<ul class="flex justify-between">
							<li><a class="inline-block border-b border-black" href="#app_info" data-app-view="text">over</a></li>
							<li><a class="inline-block border-black cursor-default" href="#app_map" data-app-view="map">kaart</a></li>
							<li><a class="inline-block border-b border-black" href="#app_help" data-app-view="help">help</a></li>
						</ul>
					</nav>
				</header>
				<div class="relative w-full h-full">
					<div id="app_info" class="bg-red absolute inset-0 z-2 w-full h-full overflow-hidden" data-app-slot="text">
					</div>
					<div id="app_help" class="bg-red absolute inset-0 z-2 w-full h-full overflow-hidden" data-app-slot="help">
						<article class="h-full overflow-y-scroll scrollbars-none bodytext text-base">
							<?= $page->intro()->kt() ?>
							<?= $page->info()->kt() ?>
						</article>
					</div>
					<div class="bg-red absolute inset-0 z-2 w-full h-full" data-app-slot="map">
							<div id="app_map" class="absolute inset-0 w-full h-full border-black border-2 bg-red"></div>
					</div>
				</div>
				<div class="player w-full mt-ws-half landscape:mt-ws">
					<audio data-player-audio>
					</audio>
					<div class="player-buttons flex flex-wrap justify-between w-full text-base leading-none">
						<button class="player-button player-button-rewind" data-player-control="rewind">rewind</button>
						<button class="player-button player-button-play mx-10" data-player-control="playpause">play</button>
						<span class="player-button landscape:hidden"></span>
						<div class="w-full landscape:w-auto flex-grow">
							<div class="player-seek w-full mt-ws-half landscape:mt-0 bg-transparent border-black">
								<input class="player-seek-progress" type="range" min="0" max="100" value="0" step="1" data-player-control="seek" >
							</div>
							<div class="flex justify-between w-full pt-2 border-black border-t-2">
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
