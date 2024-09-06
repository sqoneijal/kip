<?php

namespace App\Models\Admin;

use CodeIgniter\Model;

class PeriodePendaftaran extends Model
{

   protected $db;

   public function __construct()
   {
      $this->db = \Config\Database::connect();
   }

   public function submit($post = []): array
   {
      try {
         $table = $this->db->table('tb_mst_periode');
         $table->insert([
            'thn_ajaran' => $post['thn_ajaran'],
            'id_semester' => $post['id_semester'],
            'status' => true,
         ]);
         $id = $this->db->insertID('tb_mst_periode_id_seq');

         $this->tutupSemuaPeriode($id);
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function tutupSemuaPeriode($id)
   {
      $table = $this->db->table('tb_mst_periode');
      $table->where('id <>', $id);
      $table->update(['status' => false]);
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
      $table = $this->db->table('tb_mst_periode');
      return $table->countAllResults();
   }

   public function filteredData($post = [])
   {
      $table = $this->_queryData($post);
      return $table->countAllResults();
   }

   private function _queryData($post = [])
   {
      $table = $this->db->table('tb_mst_periode');
      $table->select('*, concat(thn_ajaran, id_semester) as semester');

      $i = 0;
      $column_search = ['thn_ajaran'];
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

      $column_order = ['semester', 'status'];
      $column = @$_POST['order'][0]['column'];
      $dir = @$_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);

      return $table;
   }
}
