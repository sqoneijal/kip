<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Common;
use CodeIgniter\Files\File;

class Assets extends BaseController
{

   protected $db;

   protected $allowed_mimes = ['image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'application/pdf'];
   protected $allowed_ext = ['pdf', 'png', 'jpg', 'jpeg'];

   public function __construct()
   {
      $this->db = \Config\Database::connect();
   }

   public function image($filename)
   {
      $path = ROOTPATH . 'public/image/' . $filename;
      if (!file_exists($path)) {
         $path = ROOTPATH . 'public/image/logo.png';
      }

      $info = new File($path);
      $handle = fopen($path, "rb");
      $contents = fread($handle, filesize($path));

      if (!in_array($info->getMimeType(), $this->allowed_mimes) && !in_array($info->guessExtension(), $this->allowed_ext)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      fclose($handle);
      header("content-type: " . $info->getMimeType());
      die($contents);
   }

   public function uploads($filename, $id)
   {
      $path = WRITEPATH . 'uploads/' . $id . '/' . $filename;
      if (!file_exists($path)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      $info = new File($path);
      $handle = fopen($path, "rb");
      $contents = fread($handle, filesize($path));

      if (!in_array($info->getMimeType(), $this->allowed_mimes) && !in_array($info->guessExtension(), $this->allowed_ext)) {
         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
      }

      fclose($handle);
      header("content-type: " . $info->getMimeType());
      die($contents);
   }

   public function init()
   {
      $common = new Common();
      $content = [
         'periode' => $common->getPeriode(),
      ];
      return $this->respond($content);
   }

   public function initMahasiswa(): object
   {
      $session = \Config\Services::session();
      $id_pendaftar = $session->get('id_pendaftar');
      $nim = $session->get('nim');

      $table = $this->db->table('tb_pendaftar');
      $table->groupStart();
      $table->where('id', $id_pendaftar);
      $table->orWhere('nim', $nim);
      $table->groupEnd();

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }

      return $this->respond($response);
   }

   public function initAdmin(): object
   {
      $session = \Config\Services::session();

      $table = $this->db->table('tb_users');
      $table->select('nama, username');
      $table->where('id', $session->get('id'));

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $users = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $users[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }

      $response['user'] = $users;

      $table2 = $this->db->table('tb_mst_periode');

      $get2 = $table2->get();
      $result2 = $get2->getResultArray();
      $fieldNames2 = $get2->getFieldNames();
      $get2->freeResult();

      $periode = [];
      foreach ($result2 as $key => $val) {
         foreach ($fieldNames2 as $field) {
            $periode[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }

      $response['periode'] = $periode;

      return $this->respond($response);
   }
}
