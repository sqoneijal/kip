<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class WelcomeController extends BaseController
{

   use ResponseTrait;

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
   {
      parent::initController($request, $response, $logger);
   }

   public function template($content = [])
   {
      $internalCss[] = $this->internalCss($content);
      $internalJs[] = $this->internalJs($content);

      $data['title'] = $content['title'];
      $data['internalCss'] = css_tag($internalCss);
      $data['internalJs'] = script_tag($internalJs);
      $data['webpack_css'] = $this->generateWebpackCSS();
      $data['webpack_js'] = $this->generateWebpackJS();

      echo view('Template', $data);
   }

   public function generateWebpackCSS(): string
   {
      $file_content = [
         ROOTPATH . 'public/assets/RemixIcon_Fonts_v2.5.0/fonts/remixicon.min.css',
         ROOTPATH . 'public/assets/app.min.css',
         ROOTPATH . 'public/style.min.css',
         ROOTPATH . 'public/assets/toastr.min.css'
      ];

      $string = '';
      foreach ($file_content as $file) {
         $string .= file_get_contents($file);
      }
      return $string;
   }

   public function generateWebpackJS()
   {
      $script_tag = '';
      if (ENVIRONMENT === 'development') {
         $script_tag .= script_tag('http://localhost:8081/main.js');
      } else {
         $path = ROOTPATH . 'public/bundle/manifest.json';
         $manifest = fopen($path, "r") or die("Unable to open file!");
         $content = json_decode(fread($manifest, filesize($path)), true);
         unset($content['index.html']);

         $set = [];
         foreach ($content as $key => $val) {
            $set[$key] = str_replace('auto', '', $val);
         }

         $script_tag .= script_tag("bundle/{$set['runtime.js']}");
         $script_tag .= script_tag("bundle/{$set['main.js']}");
      }
      return $script_tag;
   }
}
