<?php

namespace App\Controllers\Admin;

use App\Models\Common;
use App\Controllers\BaseController;
use App\Models\Admin\Pendaftar as Model;

class Pendaftar extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Pendaftar',
      ];

      $this->template($this->data);
   }

   public function submitTerima(): object
   {
      $model = new Model();
      $content = $model->submitTerima($this->post);
      return $this->respond($content);
   }

   public function submitTolak(): object
   {
      $model = new Model();
      $content = $model->submitTolak($this->post);
      return $this->respond($content);
   }

   public function getDetail(): object
   {
      $common = new Common();
      $content = $common->getDetailMahasiswa($this->post['nim']);
      return $this->respond($content);
   }

   public function getData()
   {
      $model = new Model();
      $query = $model->getData($this->getVar);

      $output = [
         'draw' => intval(@$this->post['draw']),
         'recordsTotal' => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data' => $query
      ];
      return $this->respond($output);
   }
}
