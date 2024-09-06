<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class Pendaftar extends Model
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

   public function submitTerima($post = []): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('id', $post['id']);
         $table->update(['dashboard_step' => '5', 'point_berkas_dok' => $post['point_berkas_dok']]);
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function submitTolak($post = []): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('id', $post['id']);
         $table->update(['dashboard_step' => '4', 'alasan_penolakan' => $post['alasan_penolakan']]);
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
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
      $table->where('tp.dashboard_step', '2');
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
      $table->where('tp.dashboard_step', '2');

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

            if (count($column_search) - 1 === $i)
               $table->groupEnd();
         }
         $i++;
      }

      $column_order = ['nim', 'nama', 'email', 'telp', 'id_ukt'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);

      return $table;
   }
}
