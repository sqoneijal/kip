<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class Tolak extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
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
      $table->where('tp.dashboard_step', '4');
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
      $table->where('tp.dashboard_step', '4');

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

      $column_order = ['nim', 'nama', 'email', 'telp', 'id_ukt', 'point_berkas_dok'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);

      return $table;
   }
}
