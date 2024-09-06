import React, { useEffect, useState } from "react";
import { Form, Row, Button, FormGroup, FormLabel, Col, FormControl, InputGroup, Table } from "react-bootstrap";
import { post, notification, postUpload } from "../../Helpers";

const Pendidikan = (props) => {
   const { biodata } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [isSubmitPrestasi, setIsSubmitPrestasi] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [uploadProgress, setUploadProgress] = useState({});

   // string
   const [kode_sekolah, setKode_sekolah] = useState("");
   const [asal_sekolah, setAsal_sekolah] = useState("");
   const [no_induk, setNo_induk] = useState("");
   const [thn_lulus, setThn_lulus] = useState("");
   const [jurusan, setJurusan] = useState("");
   const [rangking_kelas_1, setRangking_kelas_1] = useState("");
   const [rangking_kelas_2, setRangking_kelas_2] = useState("");
   const [rangking_kelas_3, setRangking_kelas_3] = useState("");
   const [rapor_kelas_1, setRapor_kelas_1] = useState("");
   const [rapor_kelas_2, setRapor_kelas_2] = useState("");
   const [rapor_kelas_3, setRapor_kelas_3] = useState("");
   const [prestasi, setPrestasi] = useState("");
   const [file_rapor_kelas_1, setFile_rapor_kelas_1] = useState("");
   const [file_rapor_kelas_2, setFile_rapor_kelas_2] = useState("");
   const [file_rapor_kelas_3, setFile_rapor_kelas_3] = useState("");

   // array
   const [daftarPrestasi, setDaftarPrestasi] = useState([]);

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setKode_sekolah(biodata.kode_sekolah);
         setAsal_sekolah(biodata.asal_sekolah);
         setNo_induk(biodata.no_induk);
         setThn_lulus(biodata.thn_lulus);
         setJurusan(biodata.jurusan);
         setRangking_kelas_1(biodata.rangking_kelas_1);
         setRangking_kelas_2(biodata.rangking_kelas_2);
         setRangking_kelas_3(biodata.rangking_kelas_3);
         setRapor_kelas_1(biodata.rapor_kelas_1);
         setRapor_kelas_2(biodata.rapor_kelas_2);
         setRapor_kelas_3(biodata.rapor_kelas_3);
         setFile_rapor_kelas_1(biodata.file_rapor_kelas_1);
         setFile_rapor_kelas_2(biodata.file_rapor_kelas_2);
         setFile_rapor_kelas_3(biodata.file_rapor_kelas_3);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         kode_sekolah: kode_sekolah,
         asal_sekolah: asal_sekolah,
         no_induk: no_induk,
         thn_lulus: thn_lulus,
         jurusan: jurusan,
         rangking_kelas_1: rangking_kelas_1,
         rangking_kelas_2: rangking_kelas_2,
         rangking_kelas_3: rangking_kelas_3,
         rapor_kelas_1: rapor_kelas_1,
         rapor_kelas_2: rapor_kelas_2,
         rapor_kelas_3: rapor_kelas_3,
         file_rapor_kelas_1: file_rapor_kelas_1,
         file_rapor_kelas_2: file_rapor_kelas_2,
         file_rapor_kelas_3: file_rapor_kelas_3,
      };

      setIsSubmit(true);
      post("/register/biodata/pendidikan", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("06");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   const handlePrestasi = () => {
      setIsSubmitPrestasi(true);
      post("/register/biodata/tambahprestasi", { id_pendaftar: biodata.id_pendaftar, prestasi: prestasi })
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               getDaftarPrestasi(biodata.id_pendaftar);
               setPrestasi("");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmitPrestasi(false));
   };

   const getDaftarPrestasi = (id_pendaftar) => {
      post("/register/biodata/getdaftarprestasi", { id_pendaftar: id_pendaftar })
         .then((res) => {
            const { data } = res;
            if (data.status) {
               setDaftarPrestasi(data.content);
            }
         })
         .catch((e) => notification(false, e.response.statusText));
   };

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         getDaftarPrestasi(biodata.id_pendaftar);
      }
   }, [biodata]);

   const deletePrestasi = (id) => {
      post("/register/biodata/hapusprestasi", { id: id, id_pendaftar: biodata.id_pendaftar })
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);

            if (data.status) {
               getDaftarPrestasi(biodata.id_pendaftar);
            }
         })
         .catch((e) => notification(false, e.response.statusText));
   };

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
               switch (label) {
                  case "file_rapor_kelas_1":
                     setFile_rapor_kelas_1(data.content);
                     break;
                  case "file_rapor_kelas_2":
                     setFile_rapor_kelas_2(data.content);
                     break;
                  case "file_rapor_kelas_3":
                     setFile_rapor_kelas_3(data.content);
                     break;
               }
            }
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setUploadProgress({ [label]: 0 });
         });
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>PENDIDIKAN</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  KODE SEKOLAH ASAL
               </FormLabel>
               <Col lg={9}>
                  <FormControl value={kode_sekolah} onChange={(e) => setKode_sekolah(e.target.value)} />
                  <small>Nomor Pokok Sekolah Nasional</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  NAMA SEKOLAH ASAL
               </FormLabel>
               <Col lg={9} className={errors.asal_sekolah ? "has-danger" : ""}>
                  <FormControl value={asal_sekolah} onChange={(e) => setAsal_sekolah(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.asal_sekolah}</FormControl.Feedback>
                  <small>Nomor Induk Siswa Nasional</small>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  NOMOR INDUK
               </FormLabel>
               <Col lg={9} className={errors.no_induk ? "has-danger" : ""}>
                  <FormControl value={no_induk} onChange={(e) => setNo_induk(e.target.value)} type="number" />
                  <FormControl.Feedback type="invalid">{errors.no_induk}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  TAHUN LULUS
               </FormLabel>
               <Col lg={9} className={errors.thn_lulus ? "has-danger" : ""}>
                  <FormControl value={thn_lulus} onChange={(e) => setThn_lulus(e.target.value)} type="number" />
                  <FormControl.Feedback type="invalid">{errors.thn_lulus}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  JURUSAN
               </FormLabel>
               <Col lg={9} className={errors.jurusan ? "has-danger" : ""}>
                  <FormControl value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.jurusan}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PRESTASI DI SEKOLAH / RANGKING
               </FormLabel>
               <Col lg={9}>
                  <Row>
                     <Col lg={3}>
                        <FormGroup className={errors.rangking_kelas_1 ? "has-danger" : ""}>
                           <FormLabel>Rangking Kelas 1</FormLabel>
                           <FormControl value={rangking_kelas_1} onChange={(e) => setRangking_kelas_1(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.rangking_kelas_1}</FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className={errors.rangking_kelas_2 ? "has-danger" : ""}>
                           <FormLabel>Rangking Kelas 2</FormLabel>
                           <FormControl value={rangking_kelas_2} onChange={(e) => setRangking_kelas_2(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.rangking_kelas_2}</FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className={errors.rangking_kelas_3 ? "has-danger" : ""}>
                           <FormLabel>Rangking Kelas 3</FormLabel>
                           <FormControl value={rangking_kelas_3} onChange={(e) => setRangking_kelas_3(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.rangking_kelas_3}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                     <Col lg={3}>
                        <FormGroup className={errors.rapor_kelas_1 ? "has-danger" : ""}>
                           <FormLabel>Nilai Rapor</FormLabel>
                           <FormControl value={rapor_kelas_1} onChange={(e) => setRapor_kelas_1(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.rapor_kelas_1}</FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className={errors.rapor_kelas_2 ? "has-danger" : ""}>
                           <FormLabel>Nilai Rapor</FormLabel>
                           <FormControl value={rapor_kelas_2} onChange={(e) => setRapor_kelas_2(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.rapor_kelas_2}</FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className={errors.rapor_kelas_3 ? "has-danger" : ""}>
                           <FormLabel>Nilai Rapor</FormLabel>
                           <FormControl value={rapor_kelas_3} onChange={(e) => setRapor_kelas_3(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.rapor_kelas_3}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                     <Col lg={6}>
                        <FormGroup className={errors.file_rapor_kelas_1 ? "has-danger" : ""}>
                           <FormLabel>File Rapor Kelas 1</FormLabel>
                           <InputGroup>
                              <FormControl
                                 onChange={(e) => uploadDoc(e.target.files[0], "file_rapor_kelas_1")}
                                 type="file"
                                 className="form-control"
                                 disabled={biodata.is_complete === "f" ? false : true}
                              />
                              <InputGroup.Text onClick={() => window.open("/upload/" + biodata.nim + "/" + file_rapor_kelas_1, "_blank")}>
                                 {(() => {
                                    if (file_rapor_kelas_1) {
                                       return <i className="ri-file-paper-fill" />;
                                    } else {
                                       if (uploadProgress.file_rapor_kelas_1 > 0) {
                                          return uploadProgress.file_rapor_kelas_1 + "%";
                                       }
                                    }
                                 })()}
                              </InputGroup.Text>
                           </InputGroup>
                           <FormControl.Feedback type="invalid">{errors.file_rapor_kelas_1}</FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className={errors.file_rapor_kelas_2 ? "has-danger" : ""}>
                           <FormLabel>File Rapor Kelas 2</FormLabel>
                           <InputGroup>
                              <FormControl
                                 onChange={(e) => uploadDoc(e.target.files[0], "file_rapor_kelas_2")}
                                 type="file"
                                 className="form-control"
                                 disabled={biodata.is_complete === "f" ? false : true}
                              />
                              <InputGroup.Text onClick={() => window.open("/upload/" + biodata.nim + "/" + file_rapor_kelas_2, "_blank")}>
                                 {(() => {
                                    if (file_rapor_kelas_2) {
                                       return <i className="ri-file-paper-fill" />;
                                    } else {
                                       if (uploadProgress.file_rapor_kelas_2 > 0) {
                                          return uploadProgress.file_rapor_kelas_2 + "%";
                                       }
                                    }
                                 })()}
                              </InputGroup.Text>
                           </InputGroup>
                           <FormControl.Feedback type="invalid">{errors.file_rapor_kelas_2}</FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className={errors.file_rapor_kelas_3 ? "has-danger" : ""}>
                           <FormLabel>File Rapor Kelas 3</FormLabel>
                           <InputGroup>
                              <FormControl
                                 onChange={(e) => uploadDoc(e.target.files[0], "file_rapor_kelas_3")}
                                 type="file"
                                 className="form-control"
                                 disabled={biodata.is_complete === "f" ? false : true}
                              />
                              <InputGroup.Text onClick={() => window.open("/upload/" + biodata.nim + "/" + file_rapor_kelas_3, "_blank")}>
                                 {(() => {
                                    if (file_rapor_kelas_3) {
                                       return <i className="ri-file-paper-fill" />;
                                    } else {
                                       if (uploadProgress.file_rapor_kelas_3 > 0) {
                                          return uploadProgress.file_rapor_kelas_3 + "%";
                                       }
                                    }
                                 })()}
                              </InputGroup.Text>
                           </InputGroup>
                           <FormControl.Feedback type="invalid">{errors.file_rapor_kelas_3}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                  </Row>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PRESTASI KO / EKSTRA KURIKULER TERBAIK
               </FormLabel>
               <Col lg={9}>
                  {daftarPrestasi.length > 0 ? (
                     <Table size="sm" bordered>
                        <thead>
                           <tr>
                              <th style={{ width: "5%" }} className="text-center">
                                 NO
                              </th>
                              <th>NAMA</th>
                              <td style={{ width: "5%" }}>{""}</td>
                           </tr>
                        </thead>
                        <tbody>
                           {daftarPrestasi.map((data, key) => {
                              return (
                                 <tr key={key}>
                                    <td className="text-center">{key + 1}</td>
                                    <td>{data.nama}</td>
                                    <td className="text-center">
                                       <Button onClick={() => deletePrestasi(data.id)} size="sm" variant="danger">
                                          <i className="mdi mdi-trash-can" />
                                       </Button>
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </Table>
                  ) : (
                     ""
                  )}
                  {(() => {
                     if (biodata.is_complete === "f") {
                        return (
                           <InputGroup className={errors.prestasi ? "has-danger" : ""}>
                              <FormControl value={prestasi} onChange={(e) => setPrestasi(e.target.value)} />
                              <InputGroup.Prepend>
                                 <Button onClick={isSubmitPrestasi ? null : handlePrestasi}>{isSubmitPrestasi ? "Loading..." : "Tambah"}</Button>
                              </InputGroup.Prepend>
                              <FormControl.Feedback type="invalid">{errors.prestasi}</FormControl.Feedback>
                           </InputGroup>
                        );
                     }
                  })()}
               </Col>
            </FormGroup>
         </div>
         {biodata.is_complete === "f" ? (
            <ul className="pager wizard twitter-bs-wizard-pager-link">
               <li className="next">
                  <Button type="submit">{isSubmit ? "Loading..." : "Selanjutnya"}</Button>
               </li>
            </ul>
         ) : (
            ""
         )}
      </Form>
   );
};
export default Pendidikan;
