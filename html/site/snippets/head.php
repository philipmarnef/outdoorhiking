<head>

	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">

	<title><?= $title ?? $site->title() ?></title>


	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2ee6a8">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">

<?php if($_SERVER['HTTP_HOST'] === 'outdoorhiking.be'): ?>
	<!-- Fathom - beautiful, simple website analytics -->
	<script src="https://cdn.usefathom.com/script.js" data-site="UITMZYFQ" defer></script>
<?php else: ?>
	<meta name="robots" content="noindex,nofollow,noodp">
<?php endif; ?>

	<?= Bnomei\Fingerprint::css('assets/css/main.css') ?>
	<?= Bnomei\Fingerprint::css('assets/css/print.css') ?>
	<?= Bnomei\Fingerprint::js('assets/js/main.js') ?>

</head>
