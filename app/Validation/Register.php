<?php namespace App\Validation;

class Register {

   public $id_pendaftar = [
      'id_pendaftar' => [
         'rules' => 'required|numeric|is_not_unique[tb_pendaftar.id,id_pendaftar]',
         'label' => 'ID pendaftar'
      ]
   ];

   public $id_prestasi = [
      'id_prestasi' => [
         'rules' => 'required|numeric|is_not_unique[tb_prestasi.id,id_prestasi]',
         'label' => 'ID prestasi'
      ]
   ];

   public function simpanDanAkhiri() {
      return $this->id_pendaftar;
   }

   public function uploadBerkasPrestasi() {
      return array_merge($this->id_pendaftar, $this->id_prestasi);
   }

   public function hapusPrestasi() {
      return array_merge($this->id_pendaftar, [
         'id' => [
            'rules' => 'required|numeric|is_not_unique[tb_prestasi.id,id]',
            'label' => 'ID prestasi'
         ]
      ]);
   }

   public function rencana() {
      return array_merge($this->id_pendaftar, [
         'rencana_tmp_tinggal' => [
            'rules' => 'required|numeric',
            'label' => 'Rencana tempat tinggal'
         ],
         'dukungan_keluarga' => [
            'rules' => 'required|numeric',
            'label' => 'Ada dukungan keluarga'
         ],
         'trans_dari_daerah_asal' => [
            'rules' => 'required|numeric',
            'label' => 'Transport dari daerah asal'
         ],
         'trans_seharihari' => [
            'rules' => 'required|numeric',
            'label' => 'Transportasi sehari hari'
         ],
      ]);
   }

   public function catatan() {
      return $this->id_pendaftar;
   }

   public function getDaftarPrestasi() {
      return $this->id_pendaftar;
   }

   public function uploadOnlyImage() {
      return $this->id_pendaftar;
   }

   public function upload() {
      return $this->id_pendaftar;
   }

   public function tambahPrestasi() {
      return [
         'prestasi' => [
            'rules' => 'required',
            'label' => 'Nama prestasi'
         ]
      ];
   }

   public function pendidikan() {
      return [
         'asal_sekolah' => [
            'rules' => 'required',
            'label' => 'Nama sekolah asal'
         ],
         'no_induk' => [
            'rules' => 'required|numeric',
            'label' => 'Nomor induk'
         ],
         'thn_lulus' => [
            'rules' => 'required|numeric|min_length[4]|max_length[4]',
            'label' => 'Tahun lulus'
         ],
         'jurusan' => [
            'rules' => 'required',
            'label' => 'Jurusan sekolah'
         ],
         'rangking_kelas_1' => [
            'rules' => 'required',
            'label' => 'Rangking kelas 1'
         ],
         'rangking_kelas_2' => [
            'rules' => 'required',
            'label' => 'Rangking kelas 2'
         ],
         'rangking_kelas_3' => [
            'rules' => 'required',
            'label' => 'Rangking kelas 3'
         ],
         'rapor_kelas_1' => [
            'rules' => 'required',
            'label' => 'Nilai rapor kelas 1'
         ],
         'rapor_kelas_2' => [
            'rules' => 'required',
            'label' => 'Nilai rapor kelas 2'
         ],
         'rapor_kelas_3' => [
            'rules' => 'required',
            'label' => 'Nilai rapor kelas 3'
         ],
         'file_rapor_kelas_1' => [
            'rules' => 'required',
            'label' => 'File rapor kelas 1'
         ],
         'file_rapor_kelas_2' => [
            'rules' => 'required',
            'label' => 'File rapor kelas 2'
         ],
         'file_rapor_kelas_3' => [
            'rules' => 'required',
            'label' => 'File rapor kelas 3'
         ],
      ];
   }

   public function ekonomiKeluarga() {
      return [
         'penghasilan_ayah' => [
            'rules' => 'required|numeric',
            'label' => 'Penghasilan ayah/wali'
         ],
         'penghasilan_ibu' => [
            'rules' => 'required|numeric',
            'label' => 'Penghasil ibu'
         ]
      ];
   }

   public function rumahTinggalKeluarga() {
      return [
         'kepemilikan_rumah' => [
            'rules' => 'required',
            'label' => 'Kepemilikan'
         ],
         'thn_perolehan_rumah' => [
            'rules' => 'required|numeric|min_length[4]|max_length[4]',
            'label' => 'Tahun perolehan'
         ],
         'sumber_listrik' => [
            'rules' => 'required|numeric',
            'label' => 'Sumber listrik'
         ],
         'luas_tanah' => [
            'rules' => 'required|numeric',
            'label' => 'Luas tanah'
         ],
         'luas_bangunan' => [
            'rules' => 'required|numeric',
            'label' => 'Luas bangunan'
         ],
         'mandi_cuci_kakus' => [
            'rules' => 'required|numeric',
            'label' => 'Mandi cuci kakus'
         ],
         'sumber_air' => [
            'rules' => 'required|numeric',
            'label' => 'Sumber air'
         ],
         'jarak_dari_pusat' => [
            'rules' => 'required|numeric',
            'label' => 'Jarak dari pusat kab/kota'
         ],
         'jumlah_orang_tinggal' => [
            'rules' => 'required|numeric',
            'label' => 'Jumlah orang tinggal'
         ],
      ];
   }

   public function keluarga($post = []) {
      return [
         'nama_ayah' => [
            'rules' => 'required',
            'label' => 'Nama ayah/wali'
         ],
         'id_pekerjaan_ayah' => [
            'rules' => 'required',
            'label' => 'Pekerjaan ayah/wali'
         ],
         'ayah_bekerja_sebagai' => [
            'rules' => $post['id_pekerjaan_ayah'] === '8' ? 'required' : 'permit_empty',
            'label' => 'Ayah/wali bekerja sebagai'
         ],
         'nama_ibu' => [
            'rules' => 'required',
            'label' => 'Nama ibu'
         ],
         'id_pekerjaan_ibu' => [
            'rules' => 'required',
            'label' => 'Pekerjaan ibu'
         ],
         'ibu_bekerja_sebagai' => [
            'rules' => $post['id_pekerjaan_ibu'] === '8' ? 'required' : 'permit_empty',
            'label' => 'Ibu bekerja sebagai'
         ],
         'jumlah_tanggungan' => [
            'rules' => 'required',
            'label' => 'Jumlah tanggungan'
         ],
         'hp_ortu' => [
            'rules' => 'required',
            'label' => 'HP orang tua'
         ],
         'sts_ayah' => [
            'rules' => 'required',
            'label' => 'Hubungan ayah'
         ],
         'sts_ibu' => [
            'rules' => 'required',
            'label' => 'Hubungan ibu'
         ],
         'pend_ayah' => [
            'rules' => 'required',
            'label' => 'Pendidikan ayan'
         ],
         'pend_ibu' => [
            'rules' => 'required',
            'label' => 'Pendidikan ibu'
         ],
         'keadaan_ayah' => [
            'rules' => 'required',
            'label' => 'Keadaan ayah'
         ],
         'keadaan_ibu' => [
            'rules' => 'required',
            'label' => 'Keadaan ibu'
         ],
      ];
   }

   public function datadiri() {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama lengkap'
         ],
         'nik' => [
            'rules' => 'required|numeric|exact_length[16]',
            'label' => 'NIK'
         ],
         'jekel' => [
            'rules' => 'required|in_list[L,P]',
            'label' => 'Jenis kelamin'
         ],
         'id_agama' => [
            'rules' => 'required|numeric',
            'label' => 'Agama'
         ],
         'tmp_lahir' => [
            'rules' => 'required',
            'label' => 'Tempat lahir'
         ],
         'tgl_lahir' => [
            'rules' => 'required|valid_date[Y-m-d]',
            'label' => 'Tanggal lahir'
         ],
         'alamat' => [
            'rules' => 'required',
            'label' => 'Alamat'
         ],
         'kode_pos' => [
            'rules' => 'required|min_length[5]|max_length[5]',
            'label' => 'Kode pos'
         ],
         'email' => [
            'rules' => 'required|valid_email',
            'label' => 'Email'
         ],
         'hp' => [
            'rules' => 'required|max_length[13]|min_length[11]',
            'label' => 'HP'
         ],
      ];
   }

   public function submit() {
      return [
         'email' => [
            'rules' => 'required|valid_email|is_unique[tb_pendaftar.email,email]',
            'label' => 'Email',
            'errors' => [
               'is_unique' => 'Email anda masukkan sudah terdaftar. Silahkan gunakan email yang lain.'
            ]
         ],
         'telp' => [
            'rules' => 'required|numeric',
            'label' => 'Nomor HP'
         ]
      ];
   }

}