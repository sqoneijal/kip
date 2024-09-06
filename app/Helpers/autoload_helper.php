<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use CodeIgniter\Files\File;

function upload_file($file, $ext_allowed = [], $upload_path)
{
   if (!file_exists($upload_path)) {
      mkdir($upload_path, 0755);
   }

   $max_upload = (int) @(ini_get('upload_max_filesize')) ?? 2;
   $client_mime = $file->getClientMimeType();

   $config_mime = new \Config\Mimes();

   $allowed_mime = [];
   foreach ($ext_allowed as $ext) {
      foreach ($config_mime::$mimes[$ext] as $row) {
         $allowed_mime[] = $row;
      }
   }

   if (in_array($client_mime, $allowed_mime)) {
      if ($max_upload >= (float) $file->getSizeByUnit('mb')) {
         $getRandomName = $file->getRandomName();
         $file->move($upload_path, $getRandomName);

         if (file_exists($upload_path . '/' . $getRandomName)) {
            $info = new File($upload_path . '/' . $getRandomName);
            if (in_array($info->getMimeType(), $allowed_mime)) {
               $response['status'] = true;
               $response['content'] = $getRandomName;
            } else {
               @unlink($upload_path . '/' . $getRandomName);

               $response['status'] = false;
               $response['content'] = 'Anda mencoba upload file yang tidak diizinkan oleh sistem.';
            }
         } else {
            $response['status'] = false;
            $response['content'] = 'Gagal meng-upload file.';
         }
      } else {
         $response['status'] = false;
         $response['content'] = 'Ukuran file yang coba anda upload terlalu besar dari yang diizinkan, maksimal ' . $max_upload . 'MB';
      }
   } else {
      $response['status'] = false;
      $response['content'] = 'File yang coba anda upload tidak diizinkan.';
   }
   return $response;
}

function send_email($params = [])
{
   $db = \Config\Database::connect();
   $table = $db->table('tb_google_email');
   $table->orderBy('email', 'RANDOM');
   $table->limit(1);

   $get = $table->get();
   $data = $get->getRowArray();

   $email = $data['email'];
   $password = $data['password'];

   $mail = new PHPMailer(true);

   $mail->SMTPDebug = 0;
   $mail->isSMTP();

   $mail->Host = "smtp.gmail.com";
   $mail->SMTPAuth = true;
   $mail->Username = $email;
   $mail->Password = $password;
   $mail->SMTPSecure = "tls";
   $mail->Port = 587;

   $mail->From = $email;
   $mail->FromName = 'PANITIA PROGRAM BANTUAN KIP KULIAH UIN AR-RANIRY';

   $mail->addAddress($params['email_penerima'], $params['nama_penerima']);

   $mail->isHTML(true);

   $mail->Subject = $params['subject'];
   $mail->Body = $params['pesan'];
   $mail->AltBody = "PANITIA PROGRAM BANTUAN KIP KULIAH UIN AR-RANIRY";

   try {
      $mail->send();
   } catch (Exception $e) {
      echo "Mailer Error: " . $mail->ErrorInfo;
   }
}
