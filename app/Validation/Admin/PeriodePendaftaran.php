<?php

namespace App\Validation\Admin;

class PeriodePendaftaran
{

   public function submit(): array
   {
      return [
         'thn_ajaran' => [
            'label' => 'Tahun ajaran',
            'rules' => 'required|numeric|exact_length[4]'
         ],
         'id_semester' => [
            'label' => 'Semester',
            'rules' => 'required|numeric'
         ],
      ];
   }
}
