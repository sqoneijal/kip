<?php namespace App\Models\Admin;

use CodeIgniter\Model;

class Pengguna extends Model {

   protected $db;

   public function __construct() {
      $this->db = \Config\Database::connect();
   }

   public function deleteRow($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);
         $table->delete();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function getDetailContent($post = []) {
      try {
         $table = $this->db->table('tb_users');
         $table->where('id', $post['id']);

         $get = $table->get();
         return $get->getRowArray();
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function submit($post = []) {
      try {
         $this->{$post['pageType'] . '_row'}($post);
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function update_row($post = []) {
      $data['nama'] = trim($post['nama']);
      if($post['password']) {
         $data['password'] = password_hash($post['password'], PASSWORD_BCRYPT);
      }

      $table = $this->db->table('tb_users');
      $table->where('id', $post['id']);
      $table->update($data);
   }

   public function insert_row($post = []) {
      $table = $this->db->table('tb_users');
      $table->insert([
         'nama' => trim($post['nama']),
         'username' => trim($post['username']),
         'password' => password_hash($post['password'], PASSWORD_BCRYPT),
         'uploaded' => date('Y-m-d H:i:s')
      ]);
   }

   public function getData() {
      try {
         $table = $this->_queryData();
         if ($_POST['length'] !== -1)
            $table->limit($_POST['length'], $_POST['start']);
         return $table->get();
      } catch(\Exception $e) {
         die($e->getMessage());
      }
   }
   
   public function countData() {
      $table = $this->db->table('tb_users');
      $table->select('count(*) as num_rows');
   
      $get = $table->get();
      $data = $get->getRowArray();
   
      return (int) $data['num_rows'];
   }
   
   public function filteredData() {
      $table = $this->_queryData();
      $get = $table->get();
      return count($get->getResultArray());
   }
   
   private function _queryData() {
      $table = $this->db->table('tb_users');
   
      $i = 0;
      $column_search = ['lower(nama)', 'lower(username)'];
      $column_order = ['nama', 'username', 'uploaded'];
      foreach ($column_search as $item) {
         if ($_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like($item, trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike($item, trim(strtolower($_POST['search']['value'])));
            }
   
            if (count($column_search) - 1 === $i)
               $table->groupEnd();
         }
         $i++;
      }
   
      $column = $_POST['order'][0]['column'];
      $dir = $_POST['order'][0]['dir'];
      $table->orderBy($column_order[$column], $dir);
   
      return $table;
   }

}