<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\Admin\Wawancara as Model;

class Wawancara extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Daftar Wawancara',
      ];

      $this->template($this->data);
   }

   public function handleDownload(): object
   {
      $model = new Model();
      $content = $model->handleDownload();
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
