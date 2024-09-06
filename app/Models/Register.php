<?php namespace App\Models;

use CodeIgniter\Model;

class Register extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function updateDynamiTable($post = []) {
      try {
         $update[$post['fields']] = $post['value'];

         $table = $this->db->table($post['table']);
         $table->where('id_pendaftar', $post['where']);
         $table->update($update);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function simpanDanAkhiri($post = []) {
      try {
         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update(['is_complete' => true]);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function uploadBerkasPrestasi($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar'], $data['id_prestasi']);

         $table = $this->db->table('tb_prestasi');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->where('id', $post['id_prestasi']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function upload($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function catatan($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function rencana($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function pendidikan($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function hapusPrestasi($post = []) {
      try {
         $table = $this->db->table('tb_prestasi');
         $table->where('id', $post['id']);
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->delete();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDaftarPrestasi($post = []) {
      try {
         $table = $this->db->table('tb_prestasi');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->orderBy('id');

         $get = $table->get();
         return $get->getResultArray();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function tambahPrestasi($post = []) {
      try {
         $table = $this->db->table('tb_prestasi');
         $table->insert([
            'id_pendaftar' => $post['id_pendaftar'],
            'nama' => $post['prestasi']
         ]);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function ekonomiKeluarga($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function rumahTinggalKeluarga($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function keluarga($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }
         unset($data['id_pendaftar']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function datadiri($post = []) {
      try {
         $data = [];
         foreach ($post as $key => $val) {
            $data[$key] = trim($val);
         }

         unset($data['email'], $data['id_pendaftar'], $data['nama']);

         $table = $this->db->table('tb_biodata');
         $table->where('id_pendaftar', $post['id_pendaftar']);
         $table->update($data);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDetailBiodata($nim) {
      try {
         $table = $this->db->table('tb_pendaftar tp');
         $table->select('tp.nama, tp.email, tp.nim, tb.*');
         $table->join('tb_biodata tb', 'tb.id_pendaftar = tp.id');
         $table->where('tp.nim', $nim);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();

         $response = [];
         foreach ($fieldNames as $key) {
            $response[$key] = (string) $data[$key];
         }
         
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getStatusDiterima($nim) {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->select('count(*) as num_rows');
         $table->where('nim', $nim);
         $table->where('is_diterima', true);

         $get = $table->get();
         $data = $get->getRowArray();

         if ($data['num_rows'] > 0) {
            return true;
         }

         return false;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getBiodataDaftar() {
      try {
         $session = \Config\Services::session();
         $nim = $session->get('nim');

         $checkApakahSudahDaftarDiPeriodeYGBenar = $this->checkApakahSudahDaftarDiPeriodeYGBenar($nim);
         if ((int) $checkApakahSudahDaftarDiPeriodeYGBenar['jumlah'] > 0) {
            $table = $this->db->table('tb_pendaftar a');
            $table->join('tb_alasan_penolakan b', 'b.id_pendaftar = a.id', 'left');
            $table->where('a.nim', $nim);
   
            $get = $table->get();
            return $get->getRowArray();
         } else {
            $this->backupDaftarSebelumnya($nim);
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   private function backupDaftarSebelumnya($nim) {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('nim', $nim);

         $get = $table->get();
         $data = $get->getRowArray();
         
         if (isset($data)) {
            $table2 = $this->db->table('tb_pendaftar_backup');
            $table2->insert($data);

            $this->deletePendaftarYangLama($nim);
         }
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function deletePendaftarYangLama($nim) {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('nim', $nim);
         $table->where('id_periode !=', function($table) {
            return $table->select('id')
               ->from('tb_mst_periode')
               ->where('status', true);
         });
         $table->delete();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   private function checkApakahSudahDaftarDiPeriodeYGBenar($nim) {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->select('count(*) as jumlah');
         $table->where('nim', $nim);
         $table->where('id_periode', function($table) {
            return $table->select('id')
               ->from('tb_mst_periode')
               ->where('status', true);
         });

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         
         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = trim($data[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = []) {
      try {
         $session = \Config\Services::session();

         $table = $this->db->table('tb_pendaftar');
         $table->insert([
            'nim' => $session->get('nim'),
            'nama' => $session->get('nama'),
            'email' => $post['email'],
            'telp' => $post['telp'],
            'kip' => @$post['kip'],
            'penghasilan' => @$post['penghasilan'],
            'covid' => @$post['covid'],
            'is_diterima' => false,
            'is_ditolak' => false,
            'tgl_daftar' => date('Y-m-d'),
            'tahun' => date('Y'),
            'is_diterima' => true
         ]);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

}