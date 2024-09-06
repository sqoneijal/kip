<?php

namespace App\Models\Mahasiswa;

use CodeIgniter\Model;
use CodeIgniter\Database\RawSql;

class Dashboard extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('id', $post['id']);
         $table->update([
            'dashboard_step' => '2',
            'nomor_kartu_sosial' => $post['nomor_kartu_sosial'],
            'telp_ortu' => $post['telp_ortu'],
         ]);
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function getDetailPengisian($id): array
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->select('tp.kartu_kip, tp.kartu_kks, tp.kartu_pkh, tp.kurang_mampu, tp.foto, tp.ktp, tp.kartu_keluarga,
      tp.ijazah, tp.slip_spp, tp.keterangan_prestasi, tp.surat_sakit, tp.surat_disabilitas, tp.kebenaran_data,
      tp.sertifikat_prestasi, tp.foto_rumah_keluarga, tp.foto_rumah_kamar_mandi, tp.foto_rumah_ruang_tamu,
      tp.foto_rumah_dapur, tp.pembayaran_pdam, tp.pembayaran_listrik, tp.rapor_kelas_x, tp.rapor_kelas_xi,
      tp.rapor_kelas_xii, formulir, nomor_kartu_sosial, telp_ortu');
      $table->where('tp.id', $id);

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
   }

   public function uploadFile($post = [])
   {
      $data[$post['field_name']] = $post['id_google_drive'];

      $table = $this->db->table('tb_pendaftar');
      $table->where('id', $post['id']);
      $table->update($data);
   }
}
