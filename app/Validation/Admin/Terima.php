<?php namespace App\Validation\Admin;

class Terima {

   public function updateNilaiRapor() {
      return [
         'biodata' => [
            'rules' => 'required|valid_json',
            'label' => 'Detail biodata'
         ],
         'field' => [
            'rules' => 'required',
            'label' => 'Field'
         ],
         'value' => [
            'rules' => 'required|numeric',
            'label' => 'Point nilai rapor'
         ]
      ];
   }

   public $id = [
      'id' => [
         'rules' => 'required|numeric|is_not_unique[tb_pendaftar.id,id]',
         'label' => 'ID pendaftar'
      ]
   ];

   public $id_pendaftar = [
      'id_pendaftar' => [
         'rules' => 'required|numeric|is_not_unique[tb_pendaftar.id,id_pendaftar]',
         'label' => 'ID pendaftar'
      ]
   ];

   public function submitStatus() {
      return array_merge($this->id_pendaftar, [
         'status' => [
            'rules' => 'required',
            'label' => 'Status'
         ],
         'pesan' => [
            'rules' => 'required',
            'label' => 'Pesan'
         ]
      ]);
   }

   public function getDetailContent() {
      return $this->id;
   }

   public function berkas() {
      return $this->id;
   }

   public function restore() {
      return $this->id;
   }

}