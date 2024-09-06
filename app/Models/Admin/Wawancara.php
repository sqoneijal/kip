<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class Wawancara extends Model
{

   protected $db;
   protected $db2;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
      $this->db2 = \Config\Database::connect('db_pmb');
   }

   public function handleDownload(): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->select('nim, nomor_kartu_sosial, telp_ortu, nilai_spp, no_invoice_spp, tgl_bayar_spp');
         $table->where('dashboard_step', '6');
         $table->where('id_periode', function ($table) {
            return $table->select('id')
               ->from('tb_mst_periode')
               ->where('status', true);
         });

         $get = $table->get();
         $result = $get->getResultArray();
         $get->freeResult();

         $nim = [];
         foreach ($result as $row) {
            $nim[] = $row['nim'];
         }

         $pendaftar = [];
         foreach ($result as $row) {
            $pendaftar[$row['nim']] = $row;
         }

         return ['status' => true, 'content' => $this->getDetailMahasiswa($nim), 'pendaftar' => $pendaftar];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function getDetailMahasiswa($nim = []): array
   {
      $response = [];
      if (count($nim) > 0) {
         $table = $this->db2->table('tb_calon_mahasiswa tcm');
         $table->select('tcm.nim, tcm.id, tcm.no_pendaftaran, tcm.no_ujian, tcm.nama, tcm.jekel, tcm.tgl_lahir, tcm.tmp_lahir,
            tcm.id_agama, tma.nama as nama_agama, tcm.ukuran_baju, tcm.warga_negara, tmn.nama as kewarganegaraan, tcm.dusun,
            tcm.rw, tcm.kode_pos, tcm.id_wilayah, tmk.nama as nama_kecamatan, tmk.id_kabkota, tmk2.nama as nama_kabkota,
            tmk2.id_provinsi, tmp.nama as nama_provinsi, tcm.nik, tcm.telp, tcm.hp, tcm.nomor_kps, tcm.nisn, tcm.jalan, tcm.rt,
            tcm.kelurahan, tcm.penerima_kps, tcm.jns_tinggal, tmjt.nama as nama_jenis_tinggal, tcm.npwp, tu.email,
            tcm.alat_transportasi, tmt.nama as nama_alat_transportasi, tcm.nik_ayah, tcm.nama_ayah, tcm.tgl_lahir_ayah,
            tcm.id_jenjang_pendidikan_ayah, tmjp.nama as nama_jenjang_pend_ayah, tcm.id_pekerjaan_ayah,
            tmp2.nama as nama_pekerjaan_ayah, tcm.id_penghasilan_ayah, tmp3.nama as nama_penghasilan_ayah, tcm.nik_ibu, tcm.nama_ibu,
            tcm.tgl_lahir_ibu, tcm.id_jenjang_pendidikan_ibu, tmjp2.nama as nama_jenjang_pend_ibu, tcm.id_pekerjaan_ibu,
            tmp4.nama as nama_pekerjaan_ibu, tcm.id_penghasilan_ibu, tmp5.nama as nama_penghasilan_ibu, tcm.nama_wali,
            tcm.tgl_lahir_wali, tcm.id_jenjang_pendidikan_wali, tmjp3.nama as nama_jenjang_pend_wali, tcm.id_pekerjaan_wali,
            tmp6.nama as nama_pekerjaan_wali, tcm.id_penghasilan_wali, tmp7.nama as nama_penghasilan_wali,
            concat(tmp8.jenjang, \' \', tmp8.nama) as program_studi_1, concat(tmp9.jenjang, \' \', tmp9.nama) as program_studi_2,
            concat(tmp10.jenjang, \' \', tmp10.nama) as program_studi_3, tcm.lampiran_rapor, tcm.lampiran_sertifikat,
            tcm.lampiran_prestasi, tcm.id_jalurmasuk, tmj.nama as nama_jalurmasuk, tcm.asal_sekolah, tcm.jurusan_sekolah,
            tcm.tahun_tamat, tcm.file_skhu, tcm.file_ijazah, tcm.no_skhu, tcm.no_ijazah, tcm.nilai_skhu, tcm.nilai_ijazah,
            tcm.jenis_ujian, tcm.no_peserta, tcm.lokasi_ujian, tcm.kartu_ujian, tcm.sertifikat_ujian, tmf.nama as nama_fakultas,
            concat(tmp11.jenjang, \' \', tmp11.nama) as nama_prodi');
         $table->join('tb_mst_agama tma', 'tma.id = tcm.id_agama', 'left');
         $table->join('tb_mst_negara tmn', 'tmn.id = tcm.warga_negara', 'left');
         $table->join('tb_mst_kecamatan tmk', 'tmk.id = tcm.id_wilayah', 'left');
         $table->join('tb_mst_kabkota tmk2', 'tmk2.id = tmk.id_kabkota', 'left');
         $table->join('tb_mst_provinsi tmp', 'tmp.id = tmk2.id_provinsi', 'left');
         $table->join('tb_mst_jenis_tinggal tmjt', 'tmjt.id = tcm.jns_tinggal', 'left');
         $table->join('tb_users tu', 'tu.id_parent = tcm.id and tu.role = 2', 'left');
         $table->join('tb_mst_transportasi tmt', 'tmt.id = tcm.alat_transportasi', 'left');
         $table->join('tb_mst_jenjang_pend tmjp', 'tmjp.id = tcm.id_jenjang_pendidikan_ayah', 'left');
         $table->join('tb_mst_pekerjaan tmp2', 'tmp2.id = tcm.id_pekerjaan_ayah', 'left');
         $table->join('tb_mst_penghasilan tmp3', 'tmp3.id = tcm.id_penghasilan_ayah', 'left');
         $table->join('tb_mst_jenjang_pend tmjp2', 'tmjp2.id = tcm.id_jenjang_pendidikan_ibu', 'left');
         $table->join('tb_mst_pekerjaan tmp4', 'tmp4.id = tcm.id_pekerjaan_ibu', 'left');
         $table->join('tb_mst_penghasilan tmp5', 'tmp5.id = tcm.id_penghasilan_ibu', 'left');
         $table->join('tb_mst_jenjang_pend tmjp3', 'tmjp3.id = tcm.id_jenjang_pendidikan_wali', 'left');
         $table->join('tb_mst_pekerjaan tmp6', 'tmp6.id = tcm.id_pekerjaan_wali', 'left');
         $table->join('tb_mst_penghasilan tmp7', 'tmp7.id = tcm.id_penghasilan_wali', 'left');
         $table->join('tb_mst_prodi tmp8', 'tmp8.kode = tcm.prodi_1', 'left');
         $table->join('tb_mst_prodi tmp9', 'tmp9.kode = tcm.prodi_2', 'left');
         $table->join('tb_mst_prodi tmp10', 'tmp10.kode = tcm.prodi_3', 'left');
         $table->join('tb_mst_jalurmasuk tmj', 'tmj.id = tcm.id_jalurmasuk', 'left');
         $table->join('tb_mst_prodi tmp11', 'tmp11.kode = tcm.id_prodi_lulus', 'left');
         $table->join('tb_mst_fakultas tmf', 'tmf.id = tmp11.id_fakultas', 'left');
         $table->whereIn('tcm.nim', $nim);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();

         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }
      return $response;
   }

   public function getData($post = [])
   {
      try {
         $table = $this->_queryData($post);
         $table->limit((int) $post['length'], (int) $post['start']);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();

         $get->freeResult();

         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = ($val[$field] ? trim($val[$field]) : '');
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function countData($post = [])
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->where('tp.id_periode', $post['id_periode']);
      $table->where('tp.dashboard_step', '6');
      return $table->countAllResults();
   }

   public function filteredData($post = [])
   {
      $table = $this->_queryData($post);
      return $table->countAllResults();
   }

   private function _queryData($post = [])
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->where('tp.id_periode', $post['id_periode']);
      $table->where('tp.dashboard_step', '6');

      $i = 0;
      $column_search = ['tp.nim', 'tp.nama', 'tp.email', 'tp.telp'];
      foreach ($column_search as $item) {
         if (@$_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($_POST['search']['value'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }

      $column_order = ['nim', 'nama', 'email', 'telp', 'id_ukt', 'point_berkas_dok'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);

      return $table;
   }
}
