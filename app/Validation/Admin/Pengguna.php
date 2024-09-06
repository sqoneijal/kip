<?php namespace App\Validation\Admin;

class Pengguna {

   public $pageType = [
      'pageType' => 'required|in_list[insert,update]'
   ];

   public $id = [
      'id' => [
         'rules' => 'required|numeric|is_not_unique[tb_users.id,id]',
         'label' => 'ID users'
      ]
   ];

   public function deleteRow() {
      return $this->id;
   }

   public function getDetailContent() {
      return $this->id;
   }

   public function submit($pageType) {
      return array_merge($this->pageType, [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama'
         ],
         'username' => [
            'rules' => $pageType === 'insert' ? 'required|is_unique[tb_users.username,username]' : 'required|is_not_unique[tb_users.username,username]',
            'label' => 'Username'
         ],
         'password' => [
            'rules' => $pageType === 'insert' ? 'required' : 'permit_empty',
            'label' => 'Password'
         ]
      ]);
   }

}