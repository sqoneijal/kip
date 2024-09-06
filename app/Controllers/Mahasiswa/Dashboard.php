<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\Mahasiswa\Dashboard as Model;
use Google\Client as Google_Client;
use Google\Service\Drive as Google_Service_Drive;
use Google\Service\Drive\DriveFile as Google_Service_Drive_DriveFile;

class Dashboard extends BaseController
{

   public function index()
   {
      $this->data = [
         'title' => 'Dashboard'
      ];

      $this->templateMahasiswa($this->data);
   }

   public function submit(): object
   {
      $model = new Model();
      $content = $model->submit($this->post);
      return $this->respond($content);
   }

   public function getDetailPengisian(): object
   {
      $model = new Model();
      $content = $model->getDetailPengisian($this->post['id']);
      return $this->respond($content);
   }

   private function cariFolderGoogleDrive($service, $folderName, $parentId = null)
   {
      $query = "name = '$folderName' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";

      if ($parentId) {
         $query .= " and '$parentId' in parents";
      }

      $response = $service->files->listFiles(array(
         'q' => $query,
         'spaces' => 'drive',
         'fields' => 'files(id, name)'
      ));

      if (count($response->files) > 0) {
         return $response->files[0]->id; // Mengambil ID dari folder pertama yang ditemukan
      } else {
         return null;
      }
   }

   private function buatFolderGoogleDrive($service, $folderName, $parentId = null)
   {
      $fileMetadata = new Google_Service_Drive_DriveFile(array(
         'name' => $folderName,
         'mimeType' => 'application/vnd.google-apps.folder'
      ));

      if ($parentId) {
         $fileMetadata->setParents(array($parentId));
      }

      $folder = $service->files->create($fileMetadata, array(
         'fields' => 'id'
      ));

      return $folder->id;
   }

   public function uploadFile(): object
   {
      $response = ['status' => false, 'errors' => []];

      $file = $this->request->getFile('file');
      if ($file) {
         try {
            $parentId = '1ZX_wia-9x1ILUn6BhBANTq5g2F3SSpea';

            $client = new Google_Client();
            $client->setAuthConfig(WRITEPATH . 'pascasarjana-426104-a1a52e3d1eb5.json');
            $client->addScope(Google_Service_Drive::DRIVE);

            $driveService = new Google_Service_Drive($client);

            $driveFile = new Google_Service_Drive_DriveFile();
            $folderId = $this->cariFolderGoogleDrive($driveService, $this->post['nim'], $parentId);

            if ($folderId === null) {
               $folderId = $this->buatFolderGoogleDrive($driveService, $this->post['nim'], $parentId);
            }

            $driveFile->setName($file->getClientName());
            $driveFile->setParents([$folderId]);

            $googleFile = $driveService->files->create($driveFile, array(
               'data' => file_get_contents($file->getTempName()),
               'mimeType' => $file->getClientMimeType(),
               'uploadType' => 'multipart'
            ));

            $response['googleFile'] = $googleFile;
            if ($googleFile['id']) {
               $this->post['id_google_drive'] = $googleFile['id'];
               $this->post['lampiran'] = $googleFile['name'];

               $model = new Model();
               $model->uploadFile($this->post);

               $response['status'] = true;
               $response['msg_response'] = 'File lampiran berhasil di upload';
               $response['googleFile'] = $googleFile;
            } else {
               $response['msg_response'] = 'Gagal upload file, silahkan coba kembali.';
            }
         } catch (\Exception $e) {
            $response['msg_response'] = $e->getMessage();
         }
      } else {
         $response['msg_response'] = 'Silahkan pilih file terlebih dahulu.';
      }

      return $this->respond($response);
   }
}
