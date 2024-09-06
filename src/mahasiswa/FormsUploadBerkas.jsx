import React, { useLayoutEffect, useState } from "react";
import { Alert, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const FormsUploadBerkas = () => {
   const { init } = useSelector((e) => e.mahasiswa);
   const { dashboard_step } = init;

   // bool
   const [isUploading, setIsUploading] = useState(false);
   const [isLoadingInit, setIsLoadingInit] = useState(true);
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});
   const [errors, setErrors] = useState({});

   // string
   const [nomor_kartu_sosial, setNomor_kartu_sosial] = useState("");
   const [telp_ortu, setTelp_ortu] = useState("");

   const uploadFile = (field_name, file) => {
      const formData = {
         id: init.id,
         field_name,
         file,
         nim: init.nim,
      };

      setIsUploading(true);
      h.post("/mahasiswa/dashboard/uploadfile", formData)
         .then((res) => {
            const { data, status } = res;
            h.notification(data.status, data.msg_response);
            if (data.status) {
               setDetailContent((prev) => ({ ...prev, [field_name]: data.googleFile.id }));
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsUploading(false);
         });
   };

   const getDetailPengisian = (id) => {
      const formData = { id };

      setIsLoadingInit(true);
      h.post("/mahasiswa/dashboard/getdetailpengisian", formData)
         .then((res) => {
            const { data, status } = res;
            setDetailContent(data);
            setNomor_kartu_sosial(data.nomor_kartu_sosial);
            setTelp_ortu(data.telp_ortu);
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingInit(false);
         });
   };

   useLayoutEffect(() => {
      getDetailPengisian(init.id);
      return () => {};
   }, [init]);

   const submit = () => {
      const formData = { id: init.id, nomor_kartu_sosial, telp_ortu };

      setIsSubmit(true);
      h.post("/mahasiswa/dashboard/submit", formData)
         .then((res) => {
            const { data, status } = res;
            if (data.status) {
               window.location.reload();
            } else {
               h.notification(data.status, data.msg_response);
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   return (
      <React.Fragment>
         {isUploading && h.pageLoading()}
         {isLoadingInit ? (
            h.pageLoading()
         ) : (
            <Card className="shadow-sm">
               <Card.Body>
                  <Alert variant="info">
                     <p className="m-0 p-0">
                        Untuk keberhasilan diterima pengajuan beasiswa, pastikan anda meng-upload semua berkas yang diminta pada isian dibawah ini?
                     </p>
                  </Alert>
                  {dashboard_step === "3" && (
                     <Alert variant="warning">
                        <h4>Informasi Evaluasi</h4>
                        <p className="m-0 p-0">Pengisian berkas yang anda upload sebelumnya ada yang tidak sesuai, silahkan upload ulang.</p>
                        {h.parseObject(init, "point_perbaiki") && <p className="m-0 p-0">{h.parseObject(init, "point_perbaiki")}</p>}
                     </Alert>
                  )}
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Formulir</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.formulir)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("formulir", choose_file.data);
                                 setErrors((prev) => ({ ...prev, formulir: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, formulir: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "formulir") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "formulir")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.formulir)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Kartu KIP-K</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.kartu_kip)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("kartu_kip", choose_file.data);
                                 setErrors((prev) => ({ ...prev, kartu_kip: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, kartu_kip: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "kartu_kip") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "kartu_kip")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kartu_kip)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Kartu KKS</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.kartu_kks)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("kartu_kks", choose_file.data);
                                 setErrors((prev) => ({ ...prev, kartu_kks: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, kartu_kks: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "kartu_kks") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "kartu_kks")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kartu_kks)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Kartu PKH</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.kartu_pkh)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("kartu_pkh", choose_file.data);
                                 setErrors((prev) => ({ ...prev, kartu_pkh: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, kartu_pkh: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "kartu_pkh") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "kartu_pkh")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kartu_pkh)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Keterangan Kurang Mampu</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.kurang_mampu)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("kurang_mampu", choose_file.data);
                                 setErrors((prev) => ({ ...prev, kurang_mampu: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, kurang_mampu: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "kurang_mampu") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "kurang_mampu")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kurang_mampu)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Foto Diri</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.foto)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("foto", choose_file.data);
                                 setErrors((prev) => ({ ...prev, foto: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, foto: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "foto") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "foto")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.foto)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">KTP</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.ktp)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("ktp", choose_file.data);
                                 setErrors((prev) => ({ ...prev, ktp: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, ktp: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "ktp") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "ktp")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.ktp)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Kartu Keluarga</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.kartu_keluarga)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("kartu_keluarga", choose_file.data);
                                 setErrors((prev) => ({ ...prev, kartu_keluarga: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, kartu_keluarga: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "kartu_keluarga") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "kartu_keluarga")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kartu_keluarga)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Ijazah</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.ijazah)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("ijazah", choose_file.data);
                                 setErrors((prev) => ({ ...prev, ijazah: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, ijazah: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "ijazah") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "ijazah")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.ijazah)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Slip SPP/UKT</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.slip_spp)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("slip_spp", choose_file.data);
                                 setErrors((prev) => ({ ...prev, slip_spp: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, slip_spp: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "slip_spp") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "slip_spp")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.slip_spp)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Keterangan Prestasi</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.keterangan_prestasi)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("keterangan_prestasi", choose_file.data);
                                 setErrors((prev) => ({ ...prev, keterangan_prestasi: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, keterangan_prestasi: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "keterangan_prestasi") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "keterangan_prestasi")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.keterangan_prestasi)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Sertifikat Prestasi</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.sertifikat_prestasi)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("sertifikat_prestasi", choose_file.data);
                                 setErrors((prev) => ({ ...prev, sertifikat_prestasi: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, sertifikat_prestasi: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "sertifikat_prestasi") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "sertifikat_prestasi")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.sertifikat_prestasi)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Keterangan Sakit</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.surat_sakit)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("surat_sakit", choose_file.data);
                                 setErrors((prev) => ({ ...prev, surat_sakit: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, surat_sakit: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "surat_sakit") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "surat_sakit")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.surat_sakit)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Keterangan Disabilitas</span>
                        </div>
                        <Form.Control
                           type="file"
                           isInvalid={h.is_invalid(errors.surat_disabilitas)}
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("surat_disabilitas", choose_file.data);
                                 setErrors((prev) => ({ ...prev, surat_disabilitas: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, surat_disabilitas: choose_file.message }));
                              }
                           }}
                        />
                        {h.parseObject(detailContent, "surat_disabilitas") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "surat_disabilitas")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.surat_disabilitas)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Pernyataan Kebenaran Data</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("kebenaran_data", choose_file.data);
                                 setErrors((prev) => ({ ...prev, kebenaran_data: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, kebenaran_data: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.kebenaran_data)}
                        />
                        {h.parseObject(detailContent, "kebenaran_data") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "kebenaran_data")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Foto Rumah Tampak Depan Beserta Anggota Keluarga</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("foto_rumah_keluarga", choose_file.data);
                                 setErrors((prev) => ({ ...prev, foto_rumah_keluarga: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, foto_rumah_keluarga: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.foto_rumah_keluarga)}
                        />
                        {h.parseObject(detailContent, "foto_rumah_keluarga") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "foto_rumah_keluarga")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Foto Kamar Mandi Rumah</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("foto_rumah_kamar_mandi", choose_file.data);
                                 setErrors((prev) => ({ ...prev, foto_rumah_kamar_mandi: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, foto_rumah_kamar_mandi: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.foto_rumah_kamar_mandi)}
                        />
                        {h.parseObject(detailContent, "foto_rumah_kamar_mandi") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "foto_rumah_kamar_mandi")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Foto Ruang Tamu Rumah</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("foto_rumah_ruang_tamu", choose_file.data);
                                 setErrors((prev) => ({ ...prev, foto_rumah_ruang_tamu: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, foto_rumah_ruang_tamu: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.foto_rumah_ruang_tamu)}
                        />
                        {h.parseObject(detailContent, "foto_rumah_ruang_tamu") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "foto_rumah_ruang_tamu")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Foto Dapur Rumah</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("foto_rumah_dapur", choose_file.data);
                                 setErrors((prev) => ({ ...prev, foto_rumah_dapur: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, foto_rumah_dapur: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.foto_rumah_dapur)}
                        />
                        {h.parseObject(detailContent, "foto_rumah_dapur") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "foto_rumah_dapur")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Bukti Pembayaran PDAM Bulan Terakhir</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("pembayaran_pdam", choose_file.data);
                                 setErrors((prev) => ({ ...prev, pembayaran_pdam: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, pembayaran_pdam: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.pembayaran_pdam)}
                        />
                        {h.parseObject(detailContent, "pembayaran_pdam") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "pembayaran_pdam")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Bukti Pembayaran Listrik Bulan Terakhir</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("pembayaran_listrik", choose_file.data);
                                 setErrors((prev) => ({ ...prev, pembayaran_listrik: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, pembayaran_listrik: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.pembayaran_listrik)}
                        />
                        {h.parseObject(detailContent, "pembayaran_listrik") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "pembayaran_listrik")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Rapor Kelas X (Semester I dan II) / KHS</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("rapor_kelas_x", choose_file.data);
                                 setErrors((prev) => ({ ...prev, rapor_kelas_x: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, rapor_kelas_x: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.rapor_kelas_x)}
                        />
                        {h.parseObject(detailContent, "rapor_kelas_x") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "rapor_kelas_x")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Rapor Kelas XI (Semester I dan II) / KHS</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("rapor_kelas_xi", choose_file.data);
                                 setErrors((prev) => ({ ...prev, rapor_kelas_xi: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, rapor_kelas_xi: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.rapor_kelas_xi)}
                        />
                        {h.parseObject(detailContent, "rapor_kelas_xi") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "rapor_kelas_xi")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Rapor Kelas XII (Semester I dan II) / KHS</span>
                        </div>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              const choose_file = h.choose_file(e.target.files, 999_999_999_999_999);
                              if (choose_file.status) {
                                 uploadFile("rapor_kelas_xii", choose_file.data);
                                 setErrors((prev) => ({ ...prev, rapor_kelas_xii: "" }));
                              } else {
                                 setErrors((prev) => ({ ...prev, rapor_kelas_xii: choose_file.message }));
                              }
                           }}
                           isInvalid={h.is_invalid(errors.rapor_kelas_xii)}
                        />
                        {h.parseObject(detailContent, "rapor_kelas_xii") && (
                           <div className="input-group-prepend">
                              <a
                                 href={`https://drive.google.com/file/d/${h.parseObject(detailContent, "rapor_kelas_xii")}/view`}
                                 target="_blank"
                                 className="input-group-text">
                                 Lihat
                              </a>
                           </div>
                        )}
                     </div>
                     {h.msg_response(errors.kebenaran_data)}
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">Nomor Kartu Sosial</span>
                        </div>
                        <Form.Control type="text" value={nomor_kartu_sosial} onChange={(e) => setNomor_kartu_sosial(e.target.value)} />
                     </div>
                  </div>
                  <div className="form-group">
                     <div className="input-group">
                        <div className="input-group-prepend">
                           <span className="input-group-text">HP/Wa Orang Tua</span>
                        </div>
                        <Form.Control type="text" value={telp_ortu} onChange={(e) => setTelp_ortu(e.target.value)} />
                     </div>
                  </div>
               </Card.Body>
               <Card.Footer>
                  {h.buttons(`Daftar KIP`, isSubmit, {
                     onClick: () => {
                        h.confirmSubmit({
                           message: "Apakah anda yakin telah meng-upload dan memvalidasi semua berkas yang diminta.",
                        }).then((res) => {
                           if (res) submit();
                        });
                     },
                  })}
               </Card.Footer>
            </Card>
         )}
      </React.Fragment>
   );
};
export default FormsUploadBerkas;
