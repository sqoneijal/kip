<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php echo $title;?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/favicon.png">
	<?php
	echo css_tag([
		'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.0.45/css/materialdesignicons.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/dripicons/2.0.0/webfont.min.css',
		'assets/RemixIcon_Fonts_v2.5.0/fonts/remixicon.css',
		'assets/app.min.css',
		'style.css'
	]);
	?>
</head>
<body data-topbar="dark" data-layout="horizontal" data-layout-size="boxed">
	<div id="layout-wrapper">
		<header id="page-topbar"></header>
		<div class="main-content">
			<div class="page-content" id="page-content"></div>
		</div>
	</div>
	<?php
	echo script_tag([
		'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/metisMenu/3.0.6/metisMenu.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/simplebar/4.2.3/simplebar.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/node-waves/0.7.6/waves.min.js',
	]);
	echo @$webpack_js;
	?>
</body>
</html>