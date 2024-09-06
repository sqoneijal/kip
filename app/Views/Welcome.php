<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title><?php echo $title; ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/favicon.png">
	<?php
	echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css');
	echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.0.45/css/materialdesignicons.min.css');
	echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css');
	echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/dripicons/2.0.0/webfont.min.css');
	echo css_tag([
		'assets/RemixIcon_Fonts_v2.5.0/fonts/remixicon.css',
		'assets/app.min.css',
		'style.css'
	]);
	?>
</head>

<body data-topbar="dark" data-layout="horizontal" data-layout-size="boxed">
	<div id="layout-wrapper"></div>
	<?php echo @$webpack_js; ?>
</body>

</html>