<?php $languages = $kirby->languages(); ?>
<?php for($i = 0; $i < $languages->count(); $i++): ?>
	<?php if($i > 0): ?> / <?php endif ?>
	<?php
		$language = $languages->nth($i);
		$langcode = $language->code();
		if($language === $kirby->language()): ?>
	<span><?= strtoupper($langcode) ?></span>
	<?php else: ?>
	<a class="inline-block border-black border-b" href="<?= $page->url($langcode) ?>" data-langswitch><?= strtoupper($langcode) ?></a>
	<?php endif ?>
<?php endfor ?>
