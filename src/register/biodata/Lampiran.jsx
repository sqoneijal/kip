import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row, Button } from "react-bootstrap";
import { notification, post, postUpload } from "../../Helpers";
import ModalKonfirmasi from "./ModalKonfirmasi";

const Lampiran = (props) => {
   const { biodata } = props;

   // bool
   const [openModalKonfirmasi, setOpenModalKonfirmasi] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [uploadProgressPrestasi, setUploadProgressPrestasi] = useState({});

   // string
   const [surat_pernyataan, setSurat_pernyataan] = useState("");
   const [surat_pernyataan_penghasilan_ortu, setSurat_pernyataan_penghasilan_ortu] = useState("");
   const [surat_prestasi, setSurat_prestasi] = useState("");
   const [foto_diri, setFoto_diri] = useState("");
   const [foto_rumah_dan_keluarga, setFoto_rumah_dan_keluarga] = useState("");
   const [foto_rumah_depan, setFoto_rumah_depan] = useState("");
   const [foto_rumah_kanan, setFoto_rumah_kanan] = useState("");
   const [foto_rumah_kiri, setFoto_rumah_kiri] = useState("");
   const [foto_rumah_belakang, setFoto_rumah_belakang] = useState("");
   const [foto_dapur_rumah, setFoto_dapur_rumah] = useState("");
   const [foto_kamar_mandi_rumah, setFoto_kamar_mandi_rumah] = useState("");
   const [file_rapor, setFile_rapor] = useState("");
   const [file_ket_sakit, setFile_ket_sakit] = useState("");
   const [foto_ruang_tamu_rumah, setFoto_ruang_tamu_rumah] = useState("");
   const [slip_pdam, setSlip_pdam] = useState("");
   const [slip_pln, setSlip_pln] = useState("");
   const [foto_kk, setFoto_kk] = useState("");

   // array
   const [daftarPrestasi, setDaftarPrestasi] = useState([]);

   // number
   const [uploadProgress, setUploadProgress] = useState({
      surat_pernyataan: 0,
      surat_pernyataan_penghasilan_ortu: 0,
      surat_prestasi: 0,
      foto_diri: 0,
      foto_rumah_dan_keluarga: 0,
      foto_rumah_depan: 0,
      foto_rumah_kanan: 0,
      foto_rumah_kiri: 0,
      foto_rumah_belakang: 0,
      foto_dapur_rumah: 0,
      foto_kamar_mandi_rumah: 0,
      file_rapor: 0,
      file_ket_sakit: 0,
      foto_ruang_tamu_rumah: 0,
      slip_pdam: 0,
      slip_pln: 0,
      foto_kk: 0,
   });

   const getDaftarPrestasi = (id_pendaftar) => {
      post("/register/biodata/getdaftarprestasi", { id_pendaftar: id_pendaftar })
         .then((res) => {
            const { data } = res;
            setDaftarPrestasi(data.content);
         })
         .catch((e) => notification(false, e.response.statusText));
   };

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setSurat_pernyataan(biodata.surat_pernyataan);
         setSurat_pernyataan_penghasilan_ortu(biodata.surat_pernyataan_penghasilan_ortu);
         setSurat_prestasi(biodata.surat_prestasi);
         getDaftarPrestasi(biodata.id_pendaftar);
         setFoto_diri(biodata.foto_diri);
         setFoto_rumah_dan_keluarga(biodata.foto_rumah_dan_keluarga);
         setFoto_rumah_depan(biodata.foto_rumah_depan);
         setFoto_rumah_kanan(biodata.foto_rumah_kanan);
         setFoto_rumah_kiri(biodata.foto_rumah_kiri);
         setFoto_rumah_belakang(biodata.foto_rumah_belakang);
         setFoto_dapur_rumah(biodata.foto_dapur_rumah);
         setFoto_kamar_mandi_rumah(biodata.foto_kamar_mandi_rumah);
         setFoto_ruang_tamu_rumah(biodata.foto_ruang_tamu_rumah);
         setFile_rapor(biodata.file_rapor);
         setFile_ket_sakit(biodata.file_ket_sakit);
         setSlip_pdam(biodata.slip_pdam);
         setSlip_pln(biodata.slip_pln);
         setFoto_kk(biodata.foto_kk);
      }
   }, [biodata]);

   const uploadDoc = (file, label) => {
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         file: file,
         label: label,
      };

      const config = {
         onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress({ [label]: percentCompleted });
         },
      };

      postUpload("/register/biodata/upload", formData, config)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               setUploadProgress({ [label]: 0 });
               switch (label) {
                  case "surat_pernyataan":
                     setSurat_pernyataan(data.content);
                     break;
                  case "surat_pernyataan_penghasilan_ortu":
                     setSurat_pernyataan_penghasilan_ortu(data.content);
                     break;
                  case "surat_prestasi":
                     setSurat_prestasi(data.content);
                     break;
                  case "file_rapor":
                     setFile_rapor(data.content);
                     break;
                  case "file_ket_sakit":
                     setFile_ket_sakit(data.content);
                     break;
               }
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => {});
   };

   const uploadBerkasPrestasi = (file, id_prestasi) => {
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         file: file,
         id_prestasi: id_prestasi,
      };

      const config = {
         onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgressPrestasi({ [id_prestasi]: percentCompleted });
         },
      };

      postUpload("/register/biodata/uploadberkasprestasi", formData, config)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               setUploadProgressPrestasi({ [id_prestasi]: 0 });
               getDaftarPrestasi(biodata.id_pendaftar);
            }
         })
         .catch((e) => notification(false, e.response.statusText));
   };

   const uploadOnlyImage = (file, table, fields) => {
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         file: file,
         table: table,
         fields: fields,
      };

      const config = {
         onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress({ [fields]: percentCompleted });
         },
      };

      postUpload("/register/biodata/uploadonlyimage", formData, config)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               switch (fields) {
                  case "foto_diri":
                     setFoto_diri(data.content);
                     break;
                  case "foto_rumah_dan_keluarga":
                     setFoto_rumah_dan_keluarga(data.content);
                     break;
                  case "foto_rumah_depan":
                     setFoto_rumah_depan(data.content);
                     break;
                  case "foto_rumah_kanan":
                     setFoto_rumah_kanan(data.content);
                     break;
                  case "foto_rumah_kiri":
                     setFoto_rumah_kiri(data.content);
                     break;
                  case "foto_rumah_belakang":
                     setFoto_rumah_belakang(data.content);
                     break;
                  case "foto_dapur_rumah":
                     setFoto_dapur_rumah(data.content);
                     break;
                  case "foto_kamar_mandi_rumah":
                     setFoto_kamar_mandi_rumah(data.content);
                     break;
                  case "file_rapor":
                     setFile_rapor(data.content);
                     break;
                  case "file_ket_sakit":
                     setFile_ket_sakit(data.content);
                     break;
                  case "foto_ruang_tamu_rumah":
                     setFoto_ruang_tamu_rumah(data.content);
                     break;
                  case "slip_pdam":
                     setSlip_pdam(data.content);
                     break;
                  case "slip_pln":
                     setSlip_pln(data.content);
                     break;
                  case "foto_kk":
                     setFoto_kk(data.content);
                     break;
               }
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then((e) => setUploadProgress({ [fields]: 0 }));
   };

   return (
      <Form>
         <div className="tab-pane active">
            <h3>LAMPIRAN PERNYATAAN/PRESTASI</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Surat Pernyataan
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.surat_pernyataan ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadDoc(e.target.files[0], "surat_pernyataan")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.surat_pernyataan > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.surat_pernyataan}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (surat_pernyataan) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + surat_pernyataan, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.surat_pernyataan}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus PDF</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Surat Pernyataan Penghasilan Orang Tua
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.surat_pernyataan_penghasilan_ortu ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadDoc(e.target.files[0], "surat_pernyataan_penghasilan_ortu")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.surat_pernyataan_penghasilan_ortu > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.surat_pernyataan_penghasilan_ortu}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (surat_pernyataan_penghasilan_ortu) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + surat_pernyataan_penghasilan_ortu, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.surat_pernyataan_penghasilan_ortu}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus PDF</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Surat Keterangan Prestasi
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.surat_prestasi ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadDoc(e.target.files[0], "surat_prestasi")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.surat_prestasi > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.surat_prestasi}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (surat_prestasi) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + surat_prestasi, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.surat_prestasi}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus PDF</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Diri
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_diri ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_diri")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_diri > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_diri}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_diri) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_diri, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_diri}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Kartu Keluarga (KK)
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_kk ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_kk")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_kk > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_kk}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_kk) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_kk, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_kk}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Tampak Rumah dan Seluruh Keluarga
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_rumah_dan_keluarga ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_rumah_dan_keluarga")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_rumah_dan_keluarga > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_rumah_dan_keluarga}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_rumah_dan_keluarga) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_rumah_dan_keluarga, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_rumah_dan_keluarga}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Tampak Rumah Sisi Depan
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_rumah_depan ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_rumah_depan")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_rumah_depan > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_rumah_depan}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_rumah_depan) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_rumah_depan, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_rumah_depan}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            {/* <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Tampak Rumah Sisi Kanan
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_rumah_kanan ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_rumah_kanan")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_rumah_kanan > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_rumah_kanan}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_rumah_kanan) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_rumah_kanan, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_rumah_kanan}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup> */}
            {/* <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Tampak Rumah Sisi Kiri
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_rumah_kiri ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_rumah_kiri")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_rumah_kiri > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_rumah_kiri}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_rumah_kiri) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_rumah_kiri, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_rumah_kiri}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup> */}
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Tampak Rumah Sisi Belakang
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_rumah_belakang ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_rumah_belakang")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_rumah_belakang > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_rumah_belakang}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_rumah_belakang) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_rumah_belakang, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_rumah_belakang}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Dapur Rumah
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_dapur_rumah ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_dapur_rumah")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_dapur_rumah > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_dapur_rumah}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_dapur_rumah) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_dapur_rumah, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_dapur_rumah}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Ruang Tamu Rumah
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_ruang_tamu_rumah ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_ruang_tamu_rumah")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_ruang_tamu_rumah > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_ruang_tamu_rumah}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_ruang_tamu_rumah) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_ruang_tamu_rumah, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_ruang_tamu_rumah}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Foto Kamar Mandi Rumah
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.foto_kamar_mandi_rumah ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "foto_kamar_mandi_rumah")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.foto_kamar_mandi_rumah > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.foto_kamar_mandi_rumah}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (foto_kamar_mandi_rumah) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + foto_kamar_mandi_rumah, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.foto_kamar_mandi_rumah}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Slip PDAM (jika ada)
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.slip_pdam ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "slip_pdam")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.slip_pdam > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.slip_pdam}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (slip_pdam) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + slip_pdam, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.slip_pdam}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Slip PLN
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.slip_pln ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadOnlyImage(e.target.files[0], "tb_biodata", "slip_pln")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.slip_pln > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.slip_pln}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (slip_pln) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + slip_pln, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.slip_pln}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus : .jpeg, .jpg, .png</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Rapor dan Ijazah/Ket. Lulus
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.file_rapor ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadDoc(e.target.files[0], "file_rapor")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.file_rapor > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.file_rapor}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (file_rapor) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + file_rapor, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.file_rapor}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus PDF</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Surat Keterangan Sakit Kronis (jika ada)
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.file_ket_sakit ? "has-danger" : ""}>
                     <FormControl
                        onChange={(e) => uploadDoc(e.target.files[0], "file_ket_sakit")}
                        type="file"
                        className="form-control"
                        disabled={biodata.is_complete === "t" ? true : false}
                     />
                     {(() => {
                        if (uploadProgress.file_ket_sakit > 0) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{uploadProgress.file_ket_sakit}%</InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                        if (file_ket_sakit) {
                           return (
                              <InputGroup.Prepend>
                                 <InputGroup.Text
                                    onClick={() => open("/upload/" + biodata.nim + "/" + file_ket_sakit, "_blank")}
                                    style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                 >
                                    <i className="ri-file-paper-fill" />
                                 </InputGroup.Text>
                              </InputGroup.Prepend>
                           );
                        }
                     })()}
                     <FormControl.Feedback type="invalid">{errors.file_ket_sakit}</FormControl.Feedback>
                  </InputGroup>
                  <small>File harus PDF</small>
               </Col>
            </FormGroup>
            {daftarPrestasi.length > 0
               ? daftarPrestasi.map((data, key) => {
                    return (
                       <FormGroup as={Row} key={key}>
                          <FormLabel column lg={3}>
                             {data.nama}
                          </FormLabel>
                          <Col lg={9}>
                             <InputGroup className={errors[data.id] ? "has-danger" : ""}>
                                <FormControl
                                   onChange={(e) => uploadBerkasPrestasi(e.target.files[0], data.id)}
                                   type="file"
                                   className="form-control"
                                   disabled={biodata.is_complete === "t" ? true : false}
                                />
                                {(() => {
                                   if (uploadProgressPrestasi[data.id] > 0) {
                                      return (
                                         <InputGroup.Prepend>
                                            <InputGroup.Text>{uploadProgressPrestasi[data.id]}%</InputGroup.Text>
                                         </InputGroup.Prepend>
                                      );
                                   }
                                   if (data.lampiran) {
                                      return (
                                         <InputGroup.Prepend>
                                            <InputGroup.Text
                                               onClick={() => open("/upload/" + biodata.nim + "/" + data.lampiran, "_blank")}
                                               style={{ color: "#0f1823", fontWeight: "bold", cursor: "default" }}
                                            >
                                               <i className="ri-file-paper-fill" />
                                            </InputGroup.Text>
                                         </InputGroup.Prepend>
                                      );
                                   }
                                })()}
                                <FormControl.Feedback type="invalid">{errors[data.id]}</FormControl.Feedback>
                             </InputGroup>
                             <small>File harus : .pdf, .jpeg, .jpg, .png</small>
                          </Col>
                       </FormGroup>
                    );
                 })
               : ""}
         </div>
         {biodata.is_complete === "f" ? (
            <ul className="pager wizard twitter-bs-wizard-pager-link">
               <li className="next">
                  <Button onClick={() => setOpenModalKonfirmasi(true)}>Simpan dan akhiri</Button>
               </li>
            </ul>
         ) : (
            ""
         )}
         <ModalKonfirmasi biodata={biodata} openModalKonfirmasi={openModalKonfirmasi} setOpenModalKonfirmasi={(e) => setOpenModalKonfirmasi(e)} />
      </Form>
   );
};
export default Lampiran;
