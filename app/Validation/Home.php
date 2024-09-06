<?php

namespace App\Validation;

class Home
{

   public function check()
   {
      return [
         'nim' => [
            'label' => 'NIM',
            'rules' => 'required|numeric',
         ],
         'tgl_lahir' => [
            'label' => 'Tanggal lahir',
            'rules' => 'required|valid_date[Y-m-d]'
         ]
      ];
   }
}
