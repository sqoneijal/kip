import React, { useState, useEffect } from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, Row, Form } from "react-bootstrap";
import { listAgama, notification, post } from "../../Helpers";

const Datadiri = (props) => {
   const { biodata } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [nama, setNama] = useState("");
   const [nik, setNik] = useState("");
   const [jekel, setJekel] = useState("");
   const [id_agama, setId_agama] = useState("");
   const [tmp_lahir, setTmp_lahir] = useState("");
   const [tgl_lahir, setTgl_lahir] = useState("");
   const [alamat, setAlamat] = useState("");
   const [kode_pos, setKode_pos] = useState("");
   const [email, setEmail] = useState("");
   const [hp, setHp] = useState("");

   // object
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setNama(biodata.nama);
         setNik(biodata.nik);
         setJekel(biodata.jekel);
         setId_agama(biodata.id_agama);
         setTmp_lahir(biodata.tmp_lahir);
         setTgl_lahir(biodata.tgl_lahir);
         setAlamat(biodata.alamat);
         setKode_pos(biodata.kode_pos);
         setEmail(biodata.email);
         setHp(biodata.hp);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         nama: nama,
         nik: nik,
         jekel: jekel,
         id_agama: id_agama,
         tmp_lahir: tmp_lahir,
         tgl_lahir: tgl_lahir,
         alamat: alamat,
         kode_pos: kode_pos,
         email: email,
         hp: hp,
      };

      setIsSubmit(true);
      post("/register/biodata/datadiri", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("02");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>DATA DIRI</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  NAMA LENGKAP
               </FormLabel>
               <Col lg={10} className={errors.nama ? "has-danger" : ""}>
                  <FormControl value={nama} onChange={(e) => setNama(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.nama}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  NIK
               </FormLabel>
               <Col lg={10} className={errors.nik ? "has-danger" : ""}>
                  <FormControl value={nik} onChange={(e) => setNik(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.nik}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  JENIS KELAMIN
               </FormLabel>
               <Col lg={10} className={errors.jekel ? "has-danger" : ""}>
                  <div className="custom-control custom-switch mb-2">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        value="L"
                        onChange={(e) => setJekel(e.target.value)}
                        checked={jekel === "L" ? true : false}
                     />
                     <label onClick={() => setJekel("L")} className="custom-control-label">
                        Laki - Laki
                     </label>
                  </div>
                  <div className="custom-control custom-switch mb-2">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        value="P"
                        onChange={(e) => setJekel(e.target.value)}
                        checked={jekel === "P" ? true : false}
                     />
                     <label onClick={() => setJekel("P")} className="custom-control-label">
                        Perempuan
                     </label>
                  </div>
                  <FormControl.Feedback type="invalid">{errors.jekel}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  AGAMA
               </FormLabel>
               <Col lg={10} className={errors.id_agama ? "has-danger" : ""}>
                  {listAgama.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setId_agama(e.target.value)}
                              checked={id_agama === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setId_agama(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.id_agama}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  KAB/KOTA LAHIR
               </FormLabel>
               <Col lg={10} className={errors.tmp_lahir ? "has-danger" : ""}>
                  <FormControl value={tmp_lahir} onChange={(e) => setTmp_lahir(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.tmp_lahir}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  TANGGAL LAHIR
               </FormLabel>
               <Col lg={10} className={errors.tgl_lahir ? "has-danger" : ""}>
                  <FormControl value={tgl_lahir} onChange={(e) => setTgl_lahir(e.target.value)} type="date" />
                  <FormControl.Feedback type="invalid">{errors.tgl_lahir}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  ALAMAT
               </FormLabel>
               <Col lg={10} className={errors.alamat ? "has-danger" : ""}>
                  <FormControl value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.alamat}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  KODE POS
               </FormLabel>
               <Col lg={10} className={errors.kode_pos ? "has-danger" : ""}>
                  <FormControl value={kode_pos} onChange={(e) => setKode_pos(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.kode_pos}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  E-MAIL
               </FormLabel>
               <Col lg={10} className={errors.email ? "has-danger" : ""}>
                  <FormControl value={email} onChamge={(e) => setEmail(e.target.value)} disabled={true} />
                  <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={2}>
                  HP
               </FormLabel>
               <Col lg={10} className={errors.hp ? "has-danger" : ""}>
                  <FormControl value={hp} onChange={(e) => setHp(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.hp}</FormControl.Feedback>
               </Col>
            </FormGroup>
         </div>
         {biodata.is_complete === "f" ? (
            <ul className="pager wizard twitter-bs-wizard-pager-link">
               <li className="next">
                  <Button active={true} type="submit">{isSubmit ? "Loading..." : "Selanjutnya"}</Button>
               </li>
            </ul>
         ) : (
            ""
         )}
      </Form>
   );
};
export default Datadiri;
