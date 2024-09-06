import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Button } from "react-bootstrap";
import { listPekerjaanOrtu, listStatusOrtu, post, notification, pendidikanOrtu, keadaanOrtu } from "../../Helpers";

const Keluarga = (props) => {
   const { biodata, setTabActive } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [nama_ayah, setNama_ayah] = useState("");
   const [id_pekerjaan_ayah, setId_pekerjaan_ayah] = useState("");
   const [ayah_bekerja_sebagai, setAyah_bekerja_sebagai] = useState("");
   const [nama_ibu, setNama_ibu] = useState("");
   const [id_pekerjaan_ibu, setId_pekerjaan_ibu] = useState("");
   const [ibu_bekerja_sebagai, setIbu_bekerja_sebagai] = useState("");
   const [jumlah_tanggungan, setJumlah_tanggungan] = useState("");
   const [hp_ortu, setHp_ortu] = useState("");
   const [sts_ayah, setSts_ayah] = useState("");
   const [sts_ibu, setSts_ibu] = useState("");
   const [pend_ayah, setPend_ayah] = useState("");
   const [pend_ibu, setPend_ibu] = useState("");
   const [keadaan_ayah, setKeadaan_ayah] = useState("");
   const [keadaan_ibu, setKeadaan_ibu] = useState("");

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setNama_ayah(biodata.nama_ayah);
         setId_pekerjaan_ayah(biodata.id_pekerjaan_ayah);
         setAyah_bekerja_sebagai(biodata.ayah_bekerja_sebagai);
         setNama_ibu(biodata.nama_ibu);
         setId_pekerjaan_ibu(biodata.id_pekerjaan_ibu);
         setIbu_bekerja_sebagai(biodata.ibu_bekerja_sebagai);
         setJumlah_tanggungan(biodata.jumlah_tanggungan);
         setHp_ortu(biodata.hp_ortu);
         setSts_ayah(biodata.sts_ayah);
         setSts_ibu(biodata.sts_ibu);
         setPend_ayah(biodata.pend_ayah);
         setPend_ibu(biodata.pend_ibu);
         setKeadaan_ayah(biodata.keadaan_ayah);
         setKeadaan_ibu(biodata.keadaan_ibu);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         nama_ayah: nama_ayah,
         id_pekerjaan_ayah: id_pekerjaan_ayah,
         ayah_bekerja_sebagai: ayah_bekerja_sebagai,
         nama_ibu: nama_ibu,
         id_pekerjaan_ibu: id_pekerjaan_ibu,
         ibu_bekerja_sebagai: ibu_bekerja_sebagai,
         jumlah_tanggungan: jumlah_tanggungan,
         hp_ortu: hp_ortu,
         sts_ayah: sts_ayah,
         sts_ibu: sts_ibu,
         pend_ayah: pend_ayah,
         pend_ibu: pend_ibu,
         keadaan_ayah: keadaan_ayah,
         keadaan_ibu: keadaan_ibu,
      };

      setIsSubmit(true);
      post("/register/biodata/keluarga", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("03");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>KELUARGA</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  NAMA AYAH/WALI
               </FormLabel>
               <Col lg={9} className={errors.nama_ayah ? "has-danger" : ""}>
                  <FormControl value={nama_ayah} onChange={(e) => setNama_ayah(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.nama_ayah}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PEKERJAAN AYAH/WALI
               </FormLabel>
               <Col lg={9} className={errors.id_pekerjaan_ayah ? "has-danger" : ""}>
                  <FormControl value={id_pekerjaan_ayah} onChange={(e) => setId_pekerjaan_ayah(e.target.value)} as="select">
                     <option value="">--pilih--</option>
                     {listPekerjaanOrtu.map((data, key) => {
                        return (
                           <option value={data.value} key={key}>
                              {data.label}
                           </option>
                        );
                     })}
                  </FormControl>
                  <FormControl.Feedback type="invalid">{errors.id_pekerjaan_ayah}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  BEKERJA SEBAGAI
               </FormLabel>
               <Col lg={9} className={errors.ayah_bekerja_sebagai ? "has-danger" : ""}>
                  <FormControl
                     value={ayah_bekerja_sebagai}
                     onChange={(e) => setAyah_bekerja_sebagai(e.target.value)}
                     disabled={id_pekerjaan_ayah !== "8" ? true : false}
                  />
                  <FormControl.Feedback type="invalid">{errors.ayah_bekerja_sebagai}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  NAMA IBU
               </FormLabel>
               <Col lg={9} className={errors.nama_ibu ? "has-danger" : ""}>
                  <FormControl value={nama_ibu} onChange={(e) => setNama_ibu(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.nama_ibu}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PEKERJAAN IBU
               </FormLabel>
               <Col lg={9} className={errors.id_pekerjaan_ibu ? "has-danger" : ""}>
                  <FormControl value={id_pekerjaan_ibu} onChange={(e) => setId_pekerjaan_ibu(e.target.value)} as="select">
                     <option value="">--pilih--</option>
                     {listPekerjaanOrtu.map((data, key) => {
                        return (
                           <option value={data.value} key={key}>
                              {data.label}
                           </option>
                        );
                     })}
                  </FormControl>
                  <FormControl.Feedback type="invalid">{errors.id_pekerjaan_ibu}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  BEKERJA SEBAGAI
               </FormLabel>
               <Col lg={9} className={errors.ibu_bekerja_sebagai ? "has-danger" : ""}>
                  <FormControl
                     value={ibu_bekerja_sebagai}
                     onChange={(e) => setIbu_bekerja_sebagai(e.target.value)}
                     disabled={id_pekerjaan_ibu !== "8" ? true : false}
                  />
                  <FormControl.Feedback type="invalid">{errors.ibu_bekerja_sebagai}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  JUMLAH TANGGUNGAN
               </FormLabel>
               <Col lg={9} className={errors.jumlah_tanggungan ? "has-danger" : ""}>
                  <FormControl value={jumlah_tanggungan} onChange={(e) => setJumlah_tanggungan(e.target.value)} type="number" />
                  <FormControl.Feedback type="invalid">{errors.jumlah_tanggungan}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  HP ORANG TUA
               </FormLabel>
               <Col lg={9} className={errors.hp_ortu ? "has-danger" : ""}>
                  <FormControl value={hp_ortu} onChange={(e) => setHp_ortu(e.target.value)} />
                  <FormControl.Feedback type="invalid">{errors.hp_ortu}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  STATUS ORANG TUA
               </FormLabel>
               <Col lg={9}>
                  <Row>
                     <Col lg={6} className={errors.sts_ayah ? "has-danger" : ""}>
                        <FormGroup>
                           <FormLabel>Ayah</FormLabel>
                           {listStatusOrtu.map((data, key) => {
                              return (
                                 <div className="custom-control custom-switch mb-2" key={key}>
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       value={data.value}
                                       onChange={(e) => setSts_ayah(e.target.value)}
                                       checked={sts_ayah === data.value.toString() ? true : false}
                                    />
                                    <label onClick={() => setSts_ayah(data.value.toString())} className="custom-control-label">
                                       {data.label}
                                    </label>
                                 </div>
                              );
                           })}
                           <FormControl.Feedback type="invalid">{errors.sts_ayah}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                     <Col lg={6}>
                        <FormGroup className={errors.sts_ibu ? "has-danger" : ""}>
                           <FormLabel>Ibu</FormLabel>
                           {listStatusOrtu.map((data, key) => {
                              return (
                                 <div className="custom-control custom-switch mb-2" key={key}>
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       value={data.value}
                                       onChange={(e) => setSts_ibu(e.target.value)}
                                       checked={sts_ibu === data.value.toString() ? true : false}
                                    />
                                    <label onClick={() => setSts_ibu(data.value.toString())} className="custom-control-label">
                                       {data.label}
                                    </label>
                                 </div>
                              );
                           })}
                           <FormControl.Feedback type="invalid">{errors.sts_ibu}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                  </Row>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PENDIDIKAN ORANG TUA
               </FormLabel>
               <Col lg={9}>
                  <Row>
                     <Col lg={6}>
                        <FormGroup className={errors.pend_ayah ? "has-danger" : ""}>
                           <FormLabel>Ayah</FormLabel>
                           {pendidikanOrtu.map((data, key) => {
                              return (
                                 <div className="custom-control custom-switch mb-2" key={key}>
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       value={data.value}
                                       onChange={(e) => setPend_ayah(e.target.value)}
                                       checked={pend_ayah === data.value.toString() ? true : false}
                                    />
                                    <label onClick={() => setPend_ayah(data.value.toString())} className="custom-control-label">
                                       {data.label}
                                    </label>
                                 </div>
                              );
                           })}
                           <FormControl.Feedback type="invalid">{errors.pend_ayah}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                     <Col lg={6}>
                        <FormGroup className={errors.pend_ibu ? "has-danger" : ""}>
                           <FormLabel>Ibu</FormLabel>
                           {pendidikanOrtu.map((data, key) => {
                              return (
                                 <div className="custom-control custom-switch mb-2" key={key}>
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       value={data.value}
                                       onChange={(e) => setPend_ibu(e.target.value)}
                                       checked={pend_ibu === data.value.toString() ? true : false}
                                    />
                                    <label onClick={() => setPend_ibu(data.value.toString())} className="custom-control-label">
                                       {data.label}
                                    </label>
                                 </div>
                              );
                           })}
                           <FormControl.Feedback type="invalid">{errors.pend_ibu}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                  </Row>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  ORANG TUA KANDUNG
               </FormLabel>
               <Col lg={9}>
                  <Row>
                     <Col lg={6}>
                        <FormGroup className={errors.keadaan_ayah ? "has-danger" : ""}>
                           <FormLabel>Ayah</FormLabel>
                           {keadaanOrtu.map((data, key) => {
                              return (
                                 <div className="custom-control custom-switch mb-2" key={key}>
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       value={data.value}
                                       onChange={(e) => setKeadaan_ayah(e.target.value)}
                                       checked={keadaan_ayah === data.value.toString() ? true : false}
                                    />
                                    <label onClick={() => setKeadaan_ayah(data.value.toString())} className="custom-control-label">
                                       {data.label}
                                    </label>
                                 </div>
                              );
                           })}
                           <FormControl.Feedback type="invalid">{errors.keadaan_ayah}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                     <Col lg={6}>
                        <FormGroup className={errors.keadaan_ibu ? "has-danger" : ""}>
                           <FormLabel>Ibu</FormLabel>
                           {keadaanOrtu.map((data, key) => {
                              return (
                                 <div className="custom-control custom-switch mb-2" key={key}>
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       value={data.value}
                                       onChange={(e) => setKeadaan_ibu(e.target.value)}
                                       checked={keadaan_ibu === data.value.toString() ? true : false}
                                    />
                                    <label onClick={() => setKeadaan_ibu(data.value.toString())} className="custom-control-label">
                                       {data.label}
                                    </label>
                                 </div>
                              );
                           })}
                           <FormControl.Feedback type="invalid">{errors.keadaan_ibu}</FormControl.Feedback>
                        </FormGroup>
                     </Col>
                  </Row>
               </Col>
            </FormGroup>
         </div>
         {biodata.is_complete === "f" ? (
            <ul className="pager wizard twitter-bs-wizard-pager-link">
               <li className="next">
                  <Button type="submit" active={true}>
                     {isSubmit ? "Loading..." : "Selanjutnya"}
                  </Button>
               </li>
            </ul>
         ) : (
            ""
         )}
      </Form>
   );
};
export default Keluarga;
