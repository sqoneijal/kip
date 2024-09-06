<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CheckAdminSession implements FilterInterface {

   public function before(RequestInterface $request, $arguments = null) {
      $session = \Config\Services::session();

      if (!$session->get('isLogin')) {
         return redirect()->to('/login');
      }
   }

   public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
   }

}