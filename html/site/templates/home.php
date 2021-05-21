<!DOCTYPE html>
<html lang="<?= $kirby->languageCode() ?>">
<?= snippet('head') ?>

<body class="text-black bg-white">

	<main class="relative">

		<section class="fixed flex flex-col w-full landscape:w-6/12 h-screen">
			<header class="z-100 flex-grow-0 flex-shrink w-full px-ws pt-4 pb-2 text-poster bg-white">
				<h1>Outdoor Hiking with Sound &ndash;<br>&amp; Other Fireworks</h1>
				<h2 class="text-right" data-header>26.06.2021&ndash;&thinsp;03.10.2021</h2>
			</header>
			<div class="flex justify-center items-center w-full h-full px-ws">
				<div class="poster-image relative w-full h-full"></div>
			</div>
			<ul class="poster-footer flex-grow-0 flex-shrink w-full px-ws text-poster divide-y-2 divide-black">
				<li class="leading-none"><span class="inline-block w-3/12">A:</span><span>Park Den Brandt</span></li>
				<li class="leading-none"><span class="inline-block w-3/12">B:</span><span>Middelheimpark</span></li>
				<li class="leading-none"><span class="inline-block w-3/12">C:</span><span>Park Vogelenzang</span></li>
			</ul>
		</section>

		<section class="relative landscape:w-1/2 landscape:left-1/2 z-2 pt-1 landscape:pt-0">
			<div class="mt-vh landscape:mt-0 p-ws bg-green">
				<div class="xl:columns-2 bodytext hyphens">
					<?= $page->intro()->kt() ?>
					<div class="relative pl-10 mt-lb">
						<figure class="absolute top-0 left-0 -ml-2">
							<img class="w-9" src="/assets/images/info.svg" alt="">
						</figure>
						<?= $page->info()->kt() ?>
					</div>
				</div>
				<h3 class="landscape:hidden pl-10 mt-lb bodytext">Deelnemende<br>kunstenaars:</h3>
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
					<div>
						<?= $page->credits()->kt() ?>
					</div>
					<div class="xl:col-start-3">
						<?= $page->thanks()->kt() ?>
					</div>
					<div class="col-span-2 xl:col-span-1 grid grid-cols-2 xl:flex flex-wrap items-between">
						<div>
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

		<section class="fixed inset-0 left-full landscape:left-1/2 z-3 landscape:z-1 w-full landscape:w-1/2 h-screen p-ws bg-red" data-app>
			<div class="flex flex-col h-full lg:text-lg">
				<header class="w-full mb-ws-half leading-snug">
					<div class="flex justify-between items-start">
						<h3 class="flex justify-start"><span class="mr-ws" data-app-slot="num"></span><span data-app-slot="artist">–</span></h3>
						<button data-app-close>sluit</button>
					</div>
					<h4 data-app-slot="title">–</h4>
					<nav>
						<ul class="flex justify-between">
							<li><a class="inline-block border-b border-black" href="#app_info" data-app-view="info">over</a></li>
							<li><a class="inline-block border-black cursor-default" href="#app_map" data-app-view="map">kaart</a></li>
							<li><a class="inline-block border-b border-black" href="#app_help" data-app-view="help">help</a></li>
						</ul>
					</nav>
				</header>
				<section class="relative w-full h-full">
					<div id="app_info" class="bg-red absolute inset-0 w-full h-full overflow-hidden" data-app-slot="info">
					</div>
					<div id="app_help" class="bg-red absolute inset-0 w-full h-full overflow-hidden" data-app-slot="help">
						<article class="h-full overflow-y-scroll scrollbars-none bodytext text-base">
							<?= $page->intro()->kt() ?>
							<?= $page->info()->kt() ?>
						</article>					
					</div>
					<div id="app_map" class="bg-red absolute inset-0 w-full h-full border border-black" data-app-slot="map">map</div>
				</section>
				<div class="player w-full">
					<button data-player-control="rewind">rewind</button>
					<button data-player-control="play">play</button>
					<audio data-player-audio>
						<source src="" type="audio/mpeg" data-player-audio-src/>
					</audio>
				</div>
			</div>
		</section>

	</main>

</body>

</html>
