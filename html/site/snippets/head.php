<head>

	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">

	<title><?= $site->title() ?></title>

<?php if($_SERVER['HTTP_HOST'] !== 'outdoorhiking.be'): ?>
	<meta name="robots" content="noindex,nofollow,noodp">
<?php endif; ?>

	<?= Bnomei\Fingerprint::css('assets/css/main.css') ?>
	<?= Bnomei\Fingerprint::css('assets/css/print.css') ?>
	<?= Bnomei\Fingerprint::js('assets/js/main.js') ?>

</head>
