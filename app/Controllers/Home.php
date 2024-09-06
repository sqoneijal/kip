<?php

namespace App\Controllers;

use App\Models\Home as Model;
use App\Validation\Home as Validate;

class Home extends WelcomeController
{

	public function index()
	{
		$this->data = [
			'title' => 'KIP'
		];

		$this->template($this->data);
	}

	public function check()
	{
		$response = ['status' => false, 'errors' => []];

		$validation = new Validate();
		if ($this->validate($validation->check())) {
			$model = new Model();
			$submit = $model->checkDariPMB($this->post);
			// $submit = $model->checkDariSiakad($this->post);

			$response = array_merge($submit, ['errors' => []]);
		} else {
			$response['msg_response'] = 'Tolong periksa kembali inputan anda!';
			$response['errors'] = \Config\Services::validation()->getErrors();
		}
		return $this->respond($response);
	}
}
