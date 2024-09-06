<?php

namespace App\Models;

use CodeIgniter\Model;

class Home extends Model
{

   protected $db;
   protected $db2;
   protected $db3;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
      $this->db2 = \Config\Database::connect('db_pmb', true);
      $this->db3 = \Config\Database::connect('db_siakad', true);
   }

   public function checkDariSiakad(array $post): array
   {
      try {
         $table = $this->db3->table('tbl_mahasiswa tm');
         $table->select('round(sum(tmrn.bobot * tmm.sks_matakuliah) / sum(tmm.sks_matakuliah), 2) as ipk, tm.*');
         $table->join('tbl_krs tk', 'tk.nim = tm.nim');
         $table->join('tbl_krs_detail tkd', 'tkd.id_krs = tk.id_krs and tkd.sts_dipakai = 1');
         $table->join('tbl_mst_matakuliah tmm', 'tmm.kode_mk = tkd.kode_mk');
         $table->join('tb_mst_rentang_nilai tmrn', 'tmrn.huruf = tkd.nilai_huruf');
         $table->where('tm.nim', $post['nim']);
         $table->where('tm.tgl_lahir', $post['tgl_lahir']);
         $table->whereIn('tm.ta_masuk', ['2020', '2021', '2022']);

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         if (isset($data) && floatval($data['ipk']) >= 3.3) {
            foreach ($fieldNames as $field) {
               $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
            }

            $session = \Config\Services::session();

            $session->set('isLogin', true);
            $session->set('nim', $data['nim']);

            $apakahSudahDaftarSebelumnya = $this->apakahSudahDaftarSebelumnya($data['nim']);

            if (count($apakahSudahDaftarSebelumnya) > 0) {
               $submit = $this->updatePendaftar($apakahSudahDaftarSebelumnya['id'], [
                  'nim' => $data['nim'],
                  'id_periode' => $post['id_periode'],
                  'id_ukt' => $data['id_ukt'],
                  'telp' => $data['hp'],
                  'nama' => $data['nama'],
                  'email' => $data['email'],
               ]);

               $session->set('id_pendaftar', $apakahSudahDaftarSebelumnya['id']);
            } else {
               $submit = $this->insertPendaftar([
                  'nim' => $data['nim'],
                  'id_periode' => $post['id_periode'],
                  'id_ukt' => $data['id_ukt'],
                  'telp' => $data['hp'],
                  'nama' => $data['nama'],
                  'email' => $data['email'],
                  'dashboard_step' => '1'
               ]);

               $session->set('id_pendaftar', $submit);
            }
            return ['status' => true, 'content' => $session->get(), 'msg_response' => ''];
         } else {
            return ['status' => true, 'msg_response' => 'Data tidak ditemukan.'];
         }
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function checkDariPMB($post = []): array
   {
      try {
         $table = $this->db2->table('tb_calon_mahasiswa tcm');
         $table->select('tcm.*, tu.email, ti.nomor as no_invoice, ti.nilai_bayar, ti.tgl_bayar');
         $table->join('tb_users tu', 'tu.id_parent = tcm.id and tu.role = \'2\'');
         $table->join('tb_invoice ti', 'ti.id_calon = tcm.id and ti.id_komponen = 5');
         $table->where('tcm.nim', $post['nim']);
         $table->where('tcm.tgl_lahir', $post['tgl_lahir']);
         $table->where('tcm.ta_masuk', date('Y'));

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         $count = $table->countAllResults();

         if ($count > 0) {
            if (isset($data)) {
               foreach ($fieldNames as $field) {
                  $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
               }

               $session = \Config\Services::session();

               $session->set('isLogin', true);
               $session->set('nim', $data['nim']);

               $apakahSudahDaftarSebelumnya = $this->apakahSudahDaftarSebelumnya($data['nim']);

               if (count($apakahSudahDaftarSebelumnya) > 0) {
                  $submit = $this->updatePendaftar($apakahSudahDaftarSebelumnya['id'], [
                     'nim' => $data['nim'],
                     'id_periode' => $post['id_periode'],
                     'id_ukt' => $data['id_ukt'],
                     'telp' => $data['hp'],
                     'nama' => $data['nama'],
                     'email' => $data['email'],
                     'nilai_spp' => $data['nilai_bayar'],
                     'no_invoice_spp' => $data['no_invoice'],
                     'tgl_bayar_spp' => $data['tgl_bayar'],
                  ]);

                  $session->set('id_pendaftar', $apakahSudahDaftarSebelumnya['id']);
               } else {
                  $submit = $this->insertPendaftar([
                     'nim' => $data['nim'],
                     'id_periode' => $post['id_periode'],
                     'id_ukt' => $data['id_ukt'],
                     'telp' => $data['hp'],
                     'nama' => $data['nama'],
                     'email' => $data['email'],
                     'dashboard_step' => '1',
                     'nilai_spp' => $data['nilai_bayar'],
                     'no_invoice_spp' => $data['no_invoice'],
                     'tgl_bayar_spp' => $data['tgl_bayar'],
                  ]);

                  $session->set('id_pendaftar', $submit);
               }
               return ['status' => true, 'content' => $session->get(), 'msg_response' => ''];
            } else {
               return ['status' => true, 'msg_response' => 'Data tidak ditemukan.'];
            }
         } else {
            return ['status' => true, 'msg_response' => 'Data tidak ditemukan.'];
         }
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function updatePendaftar($where, $data = [])
   {
      $table = $this->db->table('tb_pendaftar');
      $table->where('id', $where);
      $table->update($data);
   }

   public function insertPendaftar($data = []): int
   {
      $table = $this->db->table('tb_pendaftar');
      $table->insert($data);
      return $this->db->insertID('tb_pendaftar_id_seq');
   }

   private function apakahSudahDaftarSebelumnya($nim): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->select('id');
         $table->where('nim', $nim);
         $table->where('id_periode', function ($table) {
            return $table->select('id')
               ->from('tb_mst_periode')
               ->where('status', true);
         });

         $get = $table->get();
         $data = $get->getRowArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         $response = [];
         if (isset($data)) {
            foreach ($fieldNames as $field) {
               $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }
}
