<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->group('/', function ($routes) {
	$routes->post('check', 'Home::check');

	$routes->get('register', 'Register::index');
	$routes->group('register', function ($routes) {
		$routes->get('getbiodata', 'Register::getBiodata');
		$routes->get('getbiodatadaftar', 'Register::getBiodataDaftar');
		$routes->post('submit', 'Register::submit');
		$routes->get('finish', 'Register::finish');
		$routes->get('statusdaftar', 'Register::checkStatusDaftar');
		$routes->get('getdetailbiodata', 'Register::getDetailBiodata');

		$routes->get('biodata', 'Register::biodata');
		$routes->group('biodata', function ($routes) {
			$routes->post('datadiri', 'Register::datadiri');
			$routes->post('keluarga', 'Register::keluarga');
			$routes->post('rumahtinggalkeluarga', 'Register::rumahTinggalKeluarga');
			$routes->post('ekonomikeluarga', 'Register::ekonomiKeluarga');
			$routes->post('pendidikan', 'Register::pendidikan');
			$routes->post('tambahprestasi', 'Register::tambahPrestasi');
			$routes->post('getdaftarprestasi', 'Register::getDaftarPrestasi');
			$routes->post('hapusprestasi', 'Register::hapusPrestasi');
			$routes->post('rencana', 'Register::rencana');
			$routes->post('catatan', 'Register::catatan');
			$routes->post('upload', 'Register::upload');
			$routes->post('uploadberkasprestasi', 'Register::uploadBerkasPrestasi');
			$routes->post('simpandanakhiri', 'Register::simpanDanAkhiri');
			$routes->post('uploadonlyimage', 'Register::uploadOnlyImage');
		});
	});
});

$routes->get('login', 'Login::index');
$routes->group('login', function ($routes) {
	$routes->get('logout', 'Login::logout');

	$routes->post('submit', 'Login::submit');
});

$routes->group('mahasiswa', ['namespace' => 'App\Controllers\Mahasiswa'], function ($routes) {
	$routes->group('dashboard', function ($routes) {
		$routes->get('/', 'Dashboard::index');

		$routes->post('uploadfile', 'Dashboard::uploadFile');
		$routes->post('getdetailpengisian', 'Dashboard::getDetailPengisian');
		$routes->post('submit', 'Dashboard::submit');
	});
});

$routes->group('admin', ['namespace' => 'App\Controllers\Admin', 'filter' => 'checkAdminSession'], function ($routes) {
	$routes->group('pendaftar', function ($routes) {
		$routes->get('/', 'Pendaftar::index');

		$routes->post('getdata', 'Pendaftar::getData');
		$routes->post('getdetail', 'Pendaftar::getDetail');
		$routes->post('submittolak', 'Pendaftar::submitTolak');
		$routes->post('submitterima', 'Pendaftar::submitTerima');
	});

	$routes->group('terima', function ($routes) {
		$routes->get('/', 'Terima::index');

		$routes->post('getdata', 'Terima::getData');
		$routes->post('submitperbaiki', 'Terima::submitPerbaiki');
		$routes->post('submitwawancara', 'Terima::submitWawancara');
	});

	$routes->group('tolak', function ($routes) {
		$routes->get('/', 'Tolak::index');

		$routes->post('getdata', 'Tolak::getData');
	});

	$routes->group('wawancara', function ($routes) {
		$routes->get('/', 'Wawancara::index');
		$routes->get('handledownload', 'Wawancara::handleDownload');

		$routes->post('getdata', 'Wawancara::getData');
	});

	$routes->group('periodependaftaran', function ($routes) {
		$routes->get('/', 'PeriodePendaftaran::index');

		$routes->post('getdata', 'PeriodePendaftaran::getData');
		$routes->post('submit', 'PeriodePendaftaran::submit');
	});

	$routes->get('pengguna', 'Pengguna::index');
	$routes->group('pengguna', function ($routes) {
		$routes->get('tambah', 'Pengguna::tambah');
		$routes->get('edit/(:num)', 'Pengguna::edit/$1');
		$routes->post('submit', 'Pengguna::submit');
		$routes->post('getdata', 'Pengguna::getData');
		$routes->post('getdetailcontent', 'Pengguna::getDetailContent');
		$routes->post('deleterow', 'Pengguna::deleteRow');
	});
});

$routes->group('assets', function ($routes) {
	$routes->get('init', 'Assets::init');
	$routes->get('initmahasiswa', 'Assets::initMahasiswa');
	$routes->get('initadmin', 'Assets::initAdmin');
	$routes->get('image/(:any)', 'Assets::image/$1');
	$routes->get('uploads/(:any)/(:num)', 'Assets::uploads/$1/$2');
});

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
