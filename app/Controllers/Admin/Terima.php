<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\Admin\Terima as Model;

class Terima extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Di Terima',
      ];

      $this->template($this->data);
   }

   public function submitWawancara(): object
   {
      $model = new Model();
      $content = $model->submitWawancara($this->post);
      return $this->respond($content);
   }

   public function submitPerbaiki(): object
   {
      $model = new Model();
      $content = $model->submitPerbaiki($this->post);
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
