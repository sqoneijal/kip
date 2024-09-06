<?php namespace App\Validation\Admin;

class Tolak {

   public $id = [
      'id' => [
         'rules' => 'required|numeric|is_not_unique[tb_pendaftar.id,id]',
         'label' => 'ID'
      ]
   ];

   public function restore() {
      return $this->id;
   }

}