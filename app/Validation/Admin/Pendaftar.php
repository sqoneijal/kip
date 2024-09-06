<?php namespace App\Validation\Admin;

class Pendaftar {

   public $id = [
      'id' => [
         'rules' => 'required|numeric|is_not_unique[tb_pendaftar.id,id]',
         'label' => 'ID'
      ]
   ];

   public function terima() {
      return $this->id;
   }

   public function tolak() {
      return $this->id;
   }

   public function berkas() {
      return $this->id;
   }

   public function hapus() {
      return $this->id;
   }

   public function handleTolak() {
      return array_merge($this->id, [
         'alasan' => [
            'rules' => 'required',
            'label' => 'Pesan/Alasan penolakan'
         ]
      ]);
   }

}