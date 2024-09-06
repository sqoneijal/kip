<?php namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class AdminController extends BaseController {

   public $env = 'development';

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function template($content = []) {
      $internalCss[] = $this->internalCss($content);
		$internalJs[] = $this->internalJs($content);
		
		$data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
		$data['internalJs'] = script_tag($internalJs);
      $data['webpack_js'] = $this->generateWebpackJS();
      $data['segment'] = $this->setSegment();

		echo view('Admin', $data);
   }

   public function generateWebpackJS() {
      if ($this->env === 'development') {
         return script_tag([
            'http://localhost:8081/vendor.js',
            'http://localhost:8081/topbar.js',
            'http://localhost:8081/navigation.js',
            'http://localhost:8081/app.js'
         ]);
      } else {
         $path = ROOTPATH . 'public/bundle/admin/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         fclose($manifest);
         unset($content['index.html']);

         $temp = [];
         foreach ($content as $key => $val) {
            $temp[] = base_url("bundle/admin/{$val}");
         }

         rsort($temp);
         $script = [];
         for ($i = 0; $i < count($temp); $i++) {
            $script[] = $temp[$i];
         }

         return script_tag($script);
      }
   }

}