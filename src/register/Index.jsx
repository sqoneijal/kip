import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormLabel, FormControl, FormGroup, Card, Button } from "react-bootstrap";
import { post, notification, get } from "../Helpers";

const Index = () => {
   // object
   const [errors, setErrors] = useState({});

   // string
   const [kip, setKip] = useState("");
   const [penghasilan, setPenghasilan] = useState("");
   const [covid, setCovid] = useState("");
   const [email, setEmail] = useState("");
   const [telp, setTelp] = useState("");

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   const getBiodata = () => {
      get("/register/statusdaftar").then((res) => {
         const { data } = res;

         if (data === "finish") {
            open("/register/finish", "_parent");
         }
      });
   };

   useEffect(() => {
      getBiodata();
   }, []);

   const showFileSize = (file, name) => {
      const file_size = file.size / 1024 / 1024;

      if (file_size > 2) {
         setErrors({ [name]: "Maksimal 2MB, ukuran file anda upload " + Math.round(file_size, 2) + "MB" });
      } else {
         if (name === "kip") {
            setKip(file);
         } else if (name === "penghasilan") {
            setPenghasilan(file);
         } else if (name === "covid") {
            setCovid(file);
         }

         setErrors({});
      }
   };

   const submit = () => {
      const formData = {
         "images[kip]": kip,
         "images[penghasilan]": penghasilan,
         "images[covid]": covid,
         email: email,
         telp: telp,
      };

      setIsSubmit(true);
      post("/register/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);
            if (data.status) {
               open("/register/finish", "_parent");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Container fluid={true}>
         <Row>
            <Col lg={12} md={12} sm={12}>
               <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Register</h4>
                  <p>Setiap file maksimal 2MB</p>
               </div>
               <Card>
                  <Card.Body>
                     <p>Silahkan upload salah satu file yang di minta dibawah ini!</p>
                     <FormGroup as={Row}>
                        <FormLabel column lg={4} md={4} sm={12} xs={12}>
                           Kartu KIP/KKS/PKH
                        </FormLabel>
                        <Col lg={8} md={8} sm={12} xs={12} className={errors.kip ? "has-danger" : ""}>
                           <FormControl onChange={(e) => showFileSize(e.target.files[0], "kip")} type="file" className="form-control" />
                           <FormControl.Feedback type="invalid">{errors.kip}</FormControl.Feedback>
                        </Col>
                     </FormGroup>
                     <FormGroup as={Row}>
                        <FormLabel column lg={4} md={4} sm={12} xs={12}>
                           Surat Pernyataan Penghasilan Orang Tua
                        </FormLabel>
                        <Col lg={8} md={8} sm={12} xs={12} className={errors.penghasilan ? "has-danger" : ""}>
                           <FormControl onChange={(e) => showFileSize(e.target.files[0], "penghasilan")} type="file" className="form-control" />
                           <FormControl.Feedback type="invalid">{errors.penghasilan}</FormControl.Feedback>
                           <FormControl.Feedback type="valid">
                              Jika tidak memiliki kartu KIP/KKS/PKH yang di keluarkan oleh kelurahan setempat
                           </FormControl.Feedback>
                        </Col>
                     </FormGroup>
                     <FormGroup as={Row}>
                        <FormLabel column lg={4} md={4} sm={12} xs={12}>
                           Dampak Covid 19/Kematian
                        </FormLabel>
                        <Col lg={8} md={8} sm={12} xs={12} className={errors.covid ? "has-danger" : ""}>
                           <FormControl onChange={(e) => showFileSize(e.target.files[0], "covid")} type="file" className="form-control" />
                           <FormControl.Feedback type="invalid">{errors.covid}</FormControl.Feedback>
                           <FormControl.Feedback type="valid">
                              Bagi mahasiswa yang terdampak Covid-19 dengan status orang tua meninggal karena Covid-19 atau terjadi pemutusan hubungan
                              kerja (PHK), maka dapat meng-upload surat Keterangan Kematian dari rumah sakit atau pemerintah setempat, atau surat
                              keterangan PHK dari perusahaan atau tempat kerja.
                           </FormControl.Feedback>
                        </Col>
                     </FormGroup>
                     <FormGroup as={Row}>
                        <FormLabel column lg={4} md={4} sm={12} xs={12}>
                           Alamat Email Aktif
                        </FormLabel>
                        <Col lg={8} md={8} sm={12} xs={12} className={errors.email ? "has-danger" : ""}>
                           <FormControl value={email} onChange={(e) => setEmail(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
                        </Col>
                     </FormGroup>
                     <FormGroup as={Row}>
                        <FormLabel column lg={4} md={4} sm={12} xs={12}>
                           Nomor HP
                        </FormLabel>
                        <Col lg={8} md={8} sm={12} xs={12} className={errors.telp ? "has-danger" : ""}>
                           <FormControl value={telp} onChange={(e) => setTelp(e.target.value)} />
                           <FormControl.Feedback type="invalid">{errors.telp}</FormControl.Feedback>
                        </Col>
                     </FormGroup>
                     <Col lg={{ span: 8, offset: 4 }} md={{ span: 8, offset: 4 }} sm={12} xs={12}>
                        <Button onClick={isSubmit ? null : submit} className="waves-effect waves-light">
                           {isSubmit ? "Loading..." : "Daftar"}
                        </Button>
                     </Col>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
};
export default Index;
