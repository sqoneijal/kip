<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use CodeIgniter\Controller;
use CodeIgniter\API\ResponseTrait;


class BaseController extends Controller
{

	use ResponseTrait;

	protected $helpers = ['style', 'filesystem', 'autoload', 'html'];
	protected $db;
	protected $session;
	public $post;
	public $getVar;
	protected $app;

	public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger);

		$this->db = \Config\Database::connect();
		$this->session = \Config\Services::session();
		$this->post = $request->getPost();
		$this->getVar = $request->getVar();
		$this->app = new \Config\App();
	}

	public function internalCss($content = [])
	{
		$internalCss = [];
		if (@$content['internalCss']) {
			foreach ($content['internalCss'] as $path) {
				$internalCss[] = $path;
			}
		}
		return $internalCss;
	}

	public function internalJs($content = [])
	{
		$internalJs = [];
		if (@$content['internalJs']) {
			foreach ($content['internalJs'] as $path) {
				$internalJs[] = $path;
			}
		}
		return $internalJs;
	}

	public function setSegment()
	{
		$string = uri_string();

		$response = [];
		foreach (explode('/', $string) as $key => $val) {
			$response[$key + 1] = $val;
		}
		return json_encode($response);
	}

	public function template($content = [])
	{
		$internalCss[] = $this->internalCss($content);
		$internalJs[] = $this->internalJs($content);

		$data['title'] = $content['title'];
		$data['internalCss'] = css_tag($internalCss);
		$data['internalJs'] = script_tag($internalJs);
		$data['webpack_css'] = $this->generateWebpackCSS();
		$data['webpack_js'] = $this->generateWebpackJS();

		echo view('Template', $data);
	}

	public function templateMahasiswa($content = [])
	{
		$internalCss[] = $this->internalCss($content);
		$internalJs[] = $this->internalJs($content);

		$data['title'] = $content['title'];
		$data['internalCss'] = css_tag($internalCss);
		$data['webpack_css'] = $this->generateWebpackCSSMahasiswa();
		$data['webpack_js'] = $this->generateWebpackJSMahasiswa(false);

		echo view('TemplateMahasiswa', $data);
	}

	private function generateWebpackJSMahasiswa(bool $publish): string
	{
		if ($publish) {
			return '<script type="module" src="' . base_url('assets/mahasiswa/app.' . HASH_JS . '.js') . '"></script>';
		} else {
			return script_tag('http://localhost:8081/App.js');
		}
	}

	private function generateWebpackCSSMahasiswa(): string
	{
		$file_content = [
			ROOTPATH . 'public/assets/datatable/dataTables.bootstrap4.min.css',
			ROOTPATH . 'public/assets/datatable/responsive.bootstrap4.min.css',
			ROOTPATH . 'public/assets/RemixIcon_Fonts_v2.5.0/fonts/remixicon.min.css',
			ROOTPATH . 'public/assets/app.min.css',
			ROOTPATH . 'public/style.min.css',
			ROOTPATH . 'public/assets/toastr.min.css',
			ROOTPATH . 'public/assets/sweetalert2.min.css',
		];

		$string = '';
		foreach ($file_content as $file) {
			$string .= file_get_contents($file);
		}
		return $string;
	}

	public function generateWebpackCSS(): string
	{
		$file_content = [
			ROOTPATH . 'public/assets/datatable/dataTables.bootstrap4.min.css',
			ROOTPATH . 'public/assets/datatable/responsive.bootstrap4.min.css',
			ROOTPATH . 'public/assets/RemixIcon_Fonts_v2.5.0/fonts/remixicon.min.css',
			ROOTPATH . 'public/assets/app.min.css',
			ROOTPATH . 'public/style.min.css',
			ROOTPATH . 'public/assets/toastr.min.css',
			ROOTPATH . 'public/assets/sweetalert2.min.css',
		];

		$string = '';
		foreach ($file_content as $file) {
			$string .= file_get_contents($file);
		}
		return $string;
	}

	public function generateWebpackJS()
	{
		$script_tag = '';
		if (ENVIRONMENT === 'development') {
			$script_tag .= script_tag('http://localhost:8081/main.js');
		} else {
			$path = ROOTPATH . 'public/bundle/manifest.json';
			$manifest = fopen($path, "r") or die("Unable to open file!");
			$content = json_decode(fread($manifest, filesize($path)), true);
			unset($content['index.html']);

			$set = [];
			foreach ($content as $key => $val) {
				$set[$key] = str_replace('auto', '', $val);
			}

			$script_tag .= script_tag("bundle/{$set['runtime.js']}");
			$script_tag .= script_tag("bundle/{$set['main.js']}");
		}
		return $script_tag;
	}
}
