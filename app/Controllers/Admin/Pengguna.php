<?php namespace App\Controllers\Admin;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Controllers\AdminController;
use App\Models\Admin\Pengguna as Model;
use App\Validation\Admin\Pengguna as Validate;

class Pengguna extends AdminController {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Pengguna',
         'internalCss' => $this->app->datatable['css'],
         'internalJs' => $this->app->datatable['js'],
      ];

      $this->template($this->data);
   }

   public function tambah() {
      $this->data = [
         'title' => 'Tambah Pengguna'
      ];

      $this->template($this->data);
   }

   public function edit() {
      $this->data = [
         'title' => 'Edit Pengguna'
      ];

      $this->template($this->data);
   }

   public function deleteRow() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->deleteRow())) {
         $model = new Model();
         $model->deleteRow($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function getDetailContent() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->getDetailContent())) {
         $model = new Model();
         $content = $model->getDetailContent($this->post);
      
         $response['status'] = true;
         $response['content'] = $content;
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->submit($this->post['pageType']))) {
         $model = new Model();
         $model->submit($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function getData() {
      $model = new Model();
      $query = $model->getData();
   
      $i = $_POST['start'];
      $response = [];
      foreach ($query->getResultArray() as $data) {
         $i++;
   
         $action = '<div class="row-actions">';
         $action .= '<span><a href="/admin/pengguna/edit/'.$data['id'].'">Edit</a> | </span>';
         $action .= '<span class="delete"><a href="javascript:void(0);" data-id="'.$data['id'].'" id="delete">Delete</a></span>';
         $action .= '</div>';
   
         $result = [];
         $result[] = $data['nama'] . $action;
         $result[] = $data['username'];
         $result[] = $data['uploaded'];
   
         $response[] = $result;
      }
   
      $output = array(
         'draw'            => intval($_POST['draw']),
         'recordsTotal'    => intval($model->countData()),
         'recordsFiltered' => intval($model->filteredData()),
         'data'            => $response
      );
      return $this->response->setJSON($output);
   }

}