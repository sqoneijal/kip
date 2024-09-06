<?php namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Validation\Register as Validate;
use App\Models\Register as Model;
use Config\Mimes;

class Register extends RegisterController {

   public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
      parent::initController($request, $response, $logger);
   }

   public function index() {
      $this->data = [
         'title' => 'Register'
      ];

      $this->template($this->data);
   }

   public function finish() {
      $this->data = [
         'title' => 'Finish'
      ];

      $this->template($this->data);
   }

   public function simpanDanAkhiri() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->simpanDanAkhiri())) {
         $model = new Model();
         $model->simpanDanAkhiri($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function uploadBerkasPrestasi() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->uploadBerkasPrestasi())) {
         $mime = new Mimes();
         $allowed_mimes = array_merge($mime::$mimes['pdf'], $mime::$mimes['png'], $mime::$mimes['jpeg'], $mime::$mimes['jpg']);

         $session = \Config\Services::session();
         $path = ROOTPATH . "public/upload/{$session->get('nim')}";

         $file = $this->request->getFile('file');
         if ($file) {
            $clientMimeType = $file->getClientMimeType();
            if (in_array($clientMimeType, $allowed_mimes)) {
               $getRandomName = $file->getRandomName();
               $file->move($path, $getRandomName);

               $dataUpdate['id_pendaftar'] = $this->post['id_pendaftar'];
               $dataUpdate['id_prestasi'] = $this->post['id_prestasi'];
               $dataUpdate['lampiran'] = $getRandomName;

               $model = new Model();
               $model->uploadBerkasPrestasi($dataUpdate);
            
               $response['status'] = true;
               $response['msg_response'] = 'Data berhasil disimpan.';
            } else {
               $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
               $response['errors'][$this->post['id_prestasi']] = 'File yang anda coba upload tidak di izinkan.';
            }
         }
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function uploadOnlyImage() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->uploadOnlyImage())) {
         $mime = new Mimes();
         $allowed_mimes = array_merge($mime::$mimes['png'], $mime::$mimes['jpeg'], $mime::$mimes['jpg']);

         $session = \Config\Services::session();
         $path = ROOTPATH . "public/upload/{$session->get('nim')}";

         $file = $this->request->getFile('file');
         if ($file) {
            $clientMimeType = $file->getClientMimeType();
            if (in_array($clientMimeType, $allowed_mimes)) {
               $getRandomName = $file->getRandomName();
               $file->move($path, $getRandomName);

               $updateData['fields'] = $this->post['fields'];
               $updateData['value'] = $getRandomName;
               $updateData['table'] = $this->post['table'];
               $updateData['where'] = $this->post['id_pendaftar'];

               $model = new Model();
               $model->updateDynamiTable($updateData);
            
               $response['status'] = true;
               $response['msg_response'] = 'Data berhasil disimpan.';
               $response['content'] = $getRandomName;
            } else {
               $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
               $response['errors'][$this->post['fields']] = 'File yang anda coba upload tidak di izinkan.';
            }
         }
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function upload() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->upload())) {
         $mime = new Mimes();
         $allowed_mimes = array_merge($mime::$mimes['pdf'], $mime::$mimes['jpg'], $mime::$mimes['jpeg'], $mime::$mimes['png']);

         $session = \Config\Services::session();
         $path = ROOTPATH . "public/upload/{$session->get('nim')}";

         $file = $this->request->getFile('file');
         if ($file) {
            $clientMimeType = $file->getClientMimeType();
            if (in_array($clientMimeType, $allowed_mimes)) {
               $getRandomName = $file->getRandomName();
               $file->move($path, $getRandomName);

               $dataUpdate['id_pendaftar'] = $this->post['id_pendaftar'];
               $dataUpdate[$this->post['label']] = $getRandomName;

               $model = new Model();
               $model->upload($dataUpdate);

               $response['status'] = true;
               $response['msg_response'] = 'File berhasil diupload.';
               $response['content'] = $getRandomName;
            } else {
               $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
               $response['errors'][$this->post['label']] = 'File yang anda coba upload tidak di izinkan.';
            }
         }
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function catatan() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->catatan())) {
         $model = new Model();
         $model->catatan($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function rencana() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->rencana())) {
         $model = new Model();
         $model->rencana($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function hapusPrestasi() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->hapusPrestasi())) {
         $model = new Model();
         $model->hapusPrestasi($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil dihapus';
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
      }
      return $this->response->setJSON($response);
   }

   public function getDaftarPrestasi($post = []) {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->getDaftarPrestasi())) {
         $model = new Model();
         $content = $model->getDaftarPrestasi($this->post);
      
         $response['status'] = true;
         $response['content'] = $content;
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function tambahPrestasi() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->tambahPrestasi())) {
         $model = new Model();
         $model->tambahPrestasi($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function pendidikan() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->pendidikan())) {
         $model = new Model();
         $model->pendidikan($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function ekonomiKeluarga() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->ekonomiKeluarga())) {
         $model = new Model();
         $model->ekonomiKeluarga($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function rumahTinggalKeluarga() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->rumahTinggalKeluarga())) {
         $model = new Model();
         $model->rumahTinggalKeluarga($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function biodata() {
      $session = \Config\Services::session();

      $model = new Model();
      $statusDiterima = $model->getStatusDiterima($session->get('nim'));

      if ($statusDiterima) {
         $this->data = [
            'title' => 'Biodata'
         ];

         $this->template($this->data);
      } else {
         echo 'Setidak nya anda sudah diterima terlebih dahulu.';
      }
   }

   public function datadiri() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->datadiri())) {
         $model = new Model();
         $model->datadiri($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function keluarga() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->keluarga($this->post))) {
         $model = new Model();
         $model->keluarga($this->post);
      
         $response['status'] = true;
         $response['msg_response'] = 'Data berhasil disimpan.';
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

   public function getDetailBiodata() {
      $session = \Config\Services::session();

      $model = new Model();
      $content = $model->getDetailBiodata($session->get('nim'));

      return $this->response->setJSON($content);
   }

   public function getBiodataDaftar() {
      $model = new Model();
      $content = $model->getBiodataDaftar();
      return $this->response->setJSON($content);
   }

   public function checkStatusDaftar() {
      $model = new Model();
      $content = $model->getBiodataDaftar();

      if ($content) {
         return $this->response->setJSON('finish');
      }
   }

   public function getBiodata() {
      $session = \Config\Services::session();
      return $this->response->setJSON($session->get());
   }

   public function submit() {
      $response = ['status' => false, 'errors' => [], 'msg_response' => ''];
      
      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $mime = new Mimes();
         $allowed_mimes = array_merge($mime::$mimes['png'], $mime::$mimes['jpeg'], $mime::$mimes['jpg'], $mime::$mimes['pdf']);
         $bool_upload_file = false;

         $session = \Config\Services::session();
         $path = ROOTPATH . "public/upload/{$session->get('nim')}";

         $kip = $this->request->getFile('images.kip');
         if ($kip) {
            $clientMimeType = $kip->getClientMimeType();
            if (in_array($clientMimeType, $allowed_mimes)) {
               $newName = $kip->getRandomName();
               $kip->move($path, $newName);

               $this->post['kip'] = $newName;
               $bool_upload_file = true;
            } else {
               $response['errors']['kip'] = 'File yang anda coba upload tidak di izinkan.';
            }
         }
         $penghasilan = $this->request->getFile('images.penghasilan');
         if ($penghasilan) {
            $clientMimeType = $penghasilan->getClientMimeType();
            if (in_array($clientMimeType, $allowed_mimes)) {
               $newName = $penghasilan->getRandomName();
               $penghasilan->move($path, $newName);

               $this->post['penghasilan'] = $newName;
               $bool_upload_file = true;
            } else {
               $response['errors']['penghasilan'] = 'File yang anda coba upload tidak di izinkan.';
            }
         }
         $covid = $this->request->getFile('images.covid');
         if ($covid) {
            $clientMimeType = $covid->getClientMimeType();
            if (in_array($clientMimeType, $allowed_mimes)) {
               $newName = $covid->getRandomName();
               $covid->move($path, $newName);

               $this->post['covid'] = $newName;
               $bool_upload_file = true;
            } else {
               $response['errors']['covid'] = 'File yang anda coba upload tidak di izinkan.';
            }
         }

         if ($bool_upload_file) {
            $model = new Model();
            $model->submit($this->post);

            $response['status'] = true;
            $response['msg_response'] = 'Data berhasil disimpan.';
         } else {
            foreach ($_POST['images'] as $key => $val) {
               if ($val === '')
                  $response['msg_response'] = 'Silahkan upload salah satu file yang diminta.';
            }
         }
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->response->setJSON($response);
   }

}