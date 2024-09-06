<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title><?php echo $title; ?></title>
   <?php
   echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css');
   echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.0.45/css/materialdesignicons.min.css');
   echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css');
   echo link_tag('https://cdnjs.cloudflare.com/ajax/libs/dripicons/2.0.0/webfont.min.css');
   echo '<style type="text/css">' . $webpack_css . '</style>';
   ?>
</head>

<body>
   <div id="layout-wrapper"></div>
   <?php echo $webpack_js; ?>
</body>

</html>