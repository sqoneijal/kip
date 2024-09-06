import React, { useEffect, useLayoutEffect, useState } from "react";
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import lozad from "lozad";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { init as setInit } from "root/redux/welcome";

const Index = () => {
   const { init } = useSelector((e) => e.welcome);
   const { periode } = init;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [isLoadingInit, setIsLoadingInit] = useState(true);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   const __init = () => {
      h.get("/assets/init")
         .then((res) => {
            const { data } = res;
            dispatch(setInit(data));
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingInit(false);
         });
   };

   useEffect(() => {
      const body = document.body;
      body.setAttribute("data-topbar", "dark");
      body.setAttribute("data-layout", "horizontal");
      body.setAttribute("data-layout-size", "boxed");
      body.classList.add("auth-body-bg");

      __init();
      return () => {};
   }, []);

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   const submit = (e) => {
      e.preventDefault();

      const periode_aktif = periode.filter((e) => e.status === "t");
      if (h.arrLength(periode_aktif)) {
         let formData = { id_periode: periode_aktif[0].id };
         Object.keys(input).map((key) => (formData[key] = input[key]));

         setIsSubmit(true);
         h.post("/check", formData)
            .then((res) => {
               const { data, status } = res;
               setErrors(data.errors);

               if (data.status) {
                  window.open("/mahasiswa/dashboard", "_parent");
               } else {
                  h.notification(data.status, data.msg_response, status);
               }
            })
            .catch((e) => {
               h.notification(false, h.error_code_http(e.response.status), e.code);
            })
            .then(() => {
               setIsSubmit(false);
            });
      } else {
         h.notification(false, "Periode pendaftaran belum dibukan oleh pihak KIP. Silahkan hubungi pihak KIP UIN Ar Raniry");
      }
   };

   return (
      <React.Fragment>
         {isLoadingInit ? (
            h.pageLoading()
         ) : (
            <Container fluid className="p-0">
               <Row className="no-gutters">
                  <Col lg={6} sm={12}>
                     <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                        <div className="w-100">
                           <Row className="justify-content-center">
                              <Col lg={9} sm={12}>
                                 <div>
                                    <div className="text-center">
                                       <div>
                                          <a href="/" className="logo">
                                             <img
                                                className="lozad"
                                                data-src="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png"
                                             />
                                          </a>
                                       </div>
                                       <h4 className="font-size-18 mt-4">Selamat datang di</h4>
                                       <p className="text-muted">Beasiswa Kartu Indonesia Pintar</p>
                                    </div>
                                    <div className="p-2 mt-5">
                                       <Form className="form-horizontal" onSubmit={isSubmit ? null : submit}>
                                          <div className="auth-form-group-custom mb-4 form-group">
                                             <i className="ri-user-2-line auti-custom-input-icon" />
                                             <Form.Label>NIM</Form.Label>
                                             <Form.Control
                                                placeholder="Masukkan NIM anda disini..."
                                                value={h.parseObject(input, "nim")}
                                                isInvalid={h.is_invalid(errors.nim)}
                                                onChange={(e) => setInput((prev) => ({ ...prev, nim: e.target.value }))}
                                             />
                                             {h.msg_response(errors.nim)}
                                          </div>
                                          <div className="auth-form-group-custom mb-4 form-group">
                                             <i className="ri-calendar-line auti-custom-input-icon" />
                                             <Form.Label>Tanggal Lahir</Form.Label>
                                             <Form.Control
                                                value={h.parseObject(input, "tgl_lahir")}
                                                isInvalid={h.is_invalid(errors.tgl_lahir)}
                                                onChange={(e) => setInput((prev) => ({ ...prev, tgl_lahir: e.target.value }))}
                                                type="date"
                                                placeholder="Masukkan tanggal lahir disini..."
                                             />
                                             {h.msg_response(errors.tgl_lahir)}
                                          </div>
                                          <div className="mt-4 text-center">{h.buttons(`Check`, isSubmit)}</div>
                                       </Form>
                                       <hr />
                                       <div className="text-center">
                                          <a href="/login">Login Admin</a>
                                       </div>
                                    </div>
                                 </div>
                              </Col>
                           </Row>
                        </div>
                     </div>
                  </Col>
                  <Col md={6} sm={12}>
                     <Card>
                        <Card.Body>
                           <h4 className="text-center">
                              PROGRAM KARTU INDONESIA PINTAR KULIAH
                              <br />
                              UNIVERSITAS ISLAM NEGERI AR-RANIRY BANDA ACEH
                              <br />
                              TAHUN {moment().format("YYYY")}
                           </h4>
                           <ol className="pl-3" style={{ listStyle: "upper-alpha" }}>
                              <li>
                                 <span style={{ fontWeight: "bold" }}>
                                    JALUR PENDAFTARAN KIP KULIAH UIN AR-RANIRY BANDA ACEH {moment().format("YYYY")}
                                    <br />
                                    KARTU JAMINAN SOSIAL
                                 </span>
                                 <ul className="pl-3">
                                    <li>Kartu KIP-K</li>
                                    <li>Kartu KKS</li>
                                    <li>Kartu PKH</li>
                                    <li>Surat Keterangan Kurang Mampu (miskin) yang dikeluarkan oleh Kepala Desa (format Terlampir)</li>
                                 </ul>
                              </li>
                              <li>
                                 <span style={{ fontWeight: "bold" }}>BERKAS YANG HARUS DILENGKAPI/UPLOAD</span>
                                 <ul className="pl-3" style={{ listStyle: "auto" }}>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Data Diri</span>
                                       <ul className="pl-3">
                                          <li>Foto Diri</li>
                                          <li>KTP Pendaftar</li>
                                       </ul>
                                    </li>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Keluarga</span>
                                       <ul className="pl-3">
                                          <li>Kartu Keluarga</li>
                                       </ul>
                                    </li>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Rumah Tinggal</span>
                                       <ul className="pl-3">
                                          <li>Photo rumah (tampak depan beserta anggota keluarga, kamar mandi, ruang tamu dan dapur)</li>
                                          <li>Bukti pembayaran PDAM bulan terakhir</li>
                                          <li>Bukti pembayaran listrik bulan terakhir</li>
                                       </ul>
                                    </li>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Ekonomi Keluarga</span>
                                       <ul className="pl-3">
                                          <li>Kartu jaminan sosial (KIP-K dan KKS dan PKH)</li>
                                          <li>Surat keterangan kurang mampu (miskin) yang dikeluarkan oleh kepala desa/kelurahan</li>
                                       </ul>
                                    </li>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Pendidikan</span>
                                       <ul className="pl-3">
                                          <li>Rapor kelas X s/d XII (semester I dan II)</li>
                                          <li>Ijazah</li>
                                          <li>Slip SPP/UKT</li>
                                          <li>Sertifikat prestasi (jika ada)</li>
                                       </ul>
                                    </li>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Catatan Khusus</span>
                                       <ul className="pl-3">
                                          <li>Jika ada sakit kronis lampirkan surat keterangan sakit</li>
                                          <li>Jika cacat lampirkan surat keterangan disabilitas</li>
                                       </ul>
                                    </li>
                                    <li>
                                       <span style={{ fontWeight: "bold" }}>Surat Pernyataan kebenaran data (Format Terlampir)</span>
                                    </li>
                                 </ul>
                              </li>
                           </ol>
                           <h6>Download Lampiran</h6>
                           <ol>
                              <li>
                                 <a href="/Surat_Pernyataan.docx" target="_blank">
                                    Surat Pernyataan
                                 </a>
                              </li>
                              <li>
                                 <a href="/srt ket.kurang mampu 2023 (1).doc" target="_blank">
                                    Surat Kurang Mampu
                                 </a>
                              </li>
                              <li>
                                 <a href="/Surat_Keterangan_Prestasi.docx" target="_blank">
                                    Surat Keterangan Prestasi
                                 </a>
                              </li>
                           </ol>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Container>
         )}
      </React.Fragment>
   );
};
export default Index;
