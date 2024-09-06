<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class ValidatePostRequest implements FilterInterface {

   public function before(RequestInterface $request, $arguments = null) {
      if (!$request->isAJAX()) {
         // die('not ajax request');
         die(json_encode(['status' => false, 'msg_response' => 'not ajax request']));
      }
   }

   public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
   }

}
