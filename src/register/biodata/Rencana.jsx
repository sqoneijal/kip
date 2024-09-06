import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, FormLabel, Row, Button, FormControl } from "react-bootstrap";
import { post, notification, rencanaTempatTinggal, transportasiDariDaerahAsal, transportasiSeharihari } from "../../Helpers";

const Rencana = (props) => {
   const { biodata } = props;

   // string
   const [rencana_tmp_tinggal, setRencana_tmp_tinggal] = useState("");
   const [dukungan_keluarga, setDukungan_keluarga] = useState("");
   const [trans_dari_daerah_asal, setTrans_dari_daerah_asal] = useState("");
   const [trans_seharihari, setTrans_seharihari] = useState("");

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setRencana_tmp_tinggal(biodata.rencana_tmp_tinggal);
         setDukungan_keluarga(biodata.dukungan_keluarga);
         setTrans_dari_daerah_asal(biodata.trans_dari_daerah_asal);
         setTrans_seharihari(biodata.trans_seharihari);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         rencana_tmp_tinggal: rencana_tmp_tinggal,
         dukungan_keluarga: dukungan_keluarga,
         trans_dari_daerah_asal: trans_dari_daerah_asal,
         trans_seharihari: trans_seharihari,
      };

      setIsSubmit(true);
      post("/register/biodata/rencana", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("07");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>RENCANA HIDUP DI LOKASI PENDIDIKAN YANG DITUJU APABILA DITERIMA</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  RENCANA TEMPAT TINGGAL
               </FormLabel>
               <Col lg={9} className={errors.rencana_tmp_tinggal ? "has-danger" : ""}>
                  {rencanaTempatTinggal.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setRencana_tmp_tinggal(e.target.value)}
                              checked={rencana_tmp_tinggal === data.value ? true : false}
                           />
                           <label onClick={() => setRencana_tmp_tinggal(data.value)} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.rencana_tmp_tinggal}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  ADA DUKUNGAN KELUARGA
               </FormLabel>
               <Col lg={9} className={errors.dukungan_keluarga ? "has-danger" : ""}>
                  <div className="custom-control custom-switch mb-2">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        value="1"
                        onChange={(e) => setDukungan_keluarga(e.target.value)}
                        checked={dukungan_keluarga === "1" ? true : false}
                     />
                     <label onClick={() => setDukungan_keluarga("1")} className="custom-control-label">
                        Iya
                     </label>
                  </div>
                  <div className="custom-control custom-switch mb-2">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        value="0"
                        onChange={(e) => setDukungan_keluarga(e.target.value)}
                        checked={dukungan_keluarga === "0" ? true : false}
                     />
                     <label onClick={() => setDukungan_keluarga("0")} className="custom-control-label">
                        Tidak
                     </label>
                  </div>
                  <FormControl.Feedback type="invalid">{errors.dukungan_keluarga}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  TRANSPORT DARI DAERAH ASAL
               </FormLabel>
               <Col lg={9} className={errors.trans_dari_daerah_asal ? "has-danger" : ""}>
                  {transportasiDariDaerahAsal.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setTrans_dari_daerah_asal(e.target.value)}
                              checked={trans_dari_daerah_asal === data.value ? true : false}
                           />
                           <label onClick={() => setTrans_dari_daerah_asal(data.value)} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.trans_dari_daerah_asal}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  TRANSPORTASI SEHARI HARI
               </FormLabel>
               <Col lg={9} className={errors.trans_seharihari ? "has-danger" : ""}>
                  {transportasiSeharihari.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setTrans_seharihari(e.target.value)}
                              checked={trans_seharihari === data.value ? true : false}
                           />
                           <label onClick={() => setTrans_seharihari(data.value)} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.trans_seharihari}</FormControl.Feedback>
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
export default Rencana;
