import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row, Button } from "react-bootstrap";
import { post, notification, kepemilikanRumah, sumberListrik, luasTanah, luasBangunan, mandiCuciKakus, sumberAir } from "../../Helpers";

const Rumahtinggalkeluarga = (props) => {
   const { biodata, setTabActive } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [kepemilikan_rumah, setKepemilikan_rumah] = useState("");
   const [thn_perolehan_rumah, setThn_perolehan_rumah] = useState("");
   const [sumber_listrik, setSumber_listrik] = useState("");
   const [luas_tanah, setLuas_tanah] = useState("");
   const [luas_bangunan, setLuas_bangunan] = useState("");
   const [mandi_cuci_kakus, setMandi_cuci_kakus] = useState("");
   const [sumber_air, setSumber_air] = useState("");
   const [jarak_dari_pusat, setJarak_dari_pusat] = useState("");
   const [jumlah_orang_tinggal, setJumlah_orang_tinggal] = useState("");

   // object
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setKepemilikan_rumah(biodata.kepemilikan_rumah);
         setThn_perolehan_rumah(biodata.thn_perolehan_rumah);
         setSumber_listrik(biodata.sumber_listrik);
         setLuas_tanah(biodata.luas_tanah);
         setLuas_bangunan(biodata.luas_bangunan);
         setMandi_cuci_kakus(biodata.mandi_cuci_kakus);
         setSumber_air(biodata.sumber_air);
         setJarak_dari_pusat(biodata.jarak_dari_pusat);
         setJumlah_orang_tinggal(biodata.jumlah_orang_tinggal);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         kepemilikan_rumah: kepemilikan_rumah,
         thn_perolehan_rumah: thn_perolehan_rumah,
         sumber_listrik: sumber_listrik,
         luas_tanah: luas_tanah,
         luas_bangunan: luas_bangunan,
         mandi_cuci_kakus: mandi_cuci_kakus,
         sumber_air: sumber_air,
         jarak_dari_pusat: jarak_dari_pusat,
         jumlah_orang_tinggal: jumlah_orang_tinggal,
      };

      setIsSubmit(true);
      post("/register/biodata/rumahtinggalkeluarga", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("04");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>RUMAH TINGGAL KELUARGA</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  KEPEMILIKAN
               </FormLabel>
               <Col lg={9} className={errors.kepemilikan_rumah ? "has-danger" : ""}>
                  {kepemilikanRumah.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setKepemilikan_rumah(e.target.value)}
                              checked={kepemilikan_rumah === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setKepemilikan_rumah(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.kepemilikan_rumah}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  TAHUN PEROLEHAN
               </FormLabel>
               <Col lg={9} className={errors.thn_perolehan_rumah ? "has-danger" : ""}>
                  <FormControl value={thn_perolehan_rumah} onChange={(e) => setThn_perolehan_rumah(e.target.value)} type="number" />
                  <FormControl.Feedback type="invalid">{errors.thn_perolehan_rumah}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  SUMBER LISTRIK
               </FormLabel>
               <Col lg={9} className={errors.sumber_listrik ? "has-danger" : ""}>
                  {sumberListrik.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setSumber_listrik(e.target.value)}
                              checked={sumber_listrik === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setSumber_listrik(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.sumber_listrik}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  LUAS TANAH
               </FormLabel>
               <Col lg={9} className={errors.luas_tanah ? "has-danger" : ""}>
                  {luasTanah.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setLuas_tanah(e.target.value)}
                              checked={luas_tanah === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setLuas_tanah(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.luas_tanah}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  LUAS BANGUNAN
               </FormLabel>
               <Col lg={9} className={errors.luas_bangunan ? "has-danger" : ""}>
                  {luasBangunan.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setLuas_bangunan(e.target.value)}
                              checked={luas_bangunan === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setLuas_bangunan(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.luas_bangunan}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  MANDI CUCI KAKUS
               </FormLabel>
               <Col lg={9} className={errors.mandi_cuci_kakus ? "has-danger" : ""}>
                  {mandiCuciKakus.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setMandi_cuci_kakus(e.target.value)}
                              checked={mandi_cuci_kakus === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setMandi_cuci_kakus(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.mandi_cuci_kakus}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  SUMBER AIR
               </FormLabel>
               <Col lg={9} className={errors.sumber_air ? "has-danger" : ""}>
                  {sumberAir.map((data, key) => {
                     return (
                        <div className="custom-control custom-switch mb-2" key={key}>
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              value={data.value}
                              onChange={(e) => setSumber_air(e.target.value)}
                              checked={sumber_air === data.value.toString() ? true : false}
                           />
                           <label onClick={() => setSumber_air(data.value.toString())} className="custom-control-label">
                              {data.label}
                           </label>
                        </div>
                     );
                  })}
                  <FormControl.Feedback type="invalid">{errors.sumber_air}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  JARAK DARI PUSAT KAB/KOTA
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.jarak_dari_pusat ? "has-danger" : ""}>
                     <FormControl value={jarak_dari_pusat} onChange={(e) => setJarak_dari_pusat(e.target.value)} type="number" />
                     <InputGroup.Prepend>
                        <InputGroup.Text>KM</InputGroup.Text>
                     </InputGroup.Prepend>
                  </InputGroup>
                  <FormControl.Feedback type="invalid">{errors.jarak_dari_pusat}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  JUMLAH ORANG TINGGAL
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.jumlah_orang_tinggal ? "has-danger" : ""}>
                     <FormControl value={jumlah_orang_tinggal} onChange={(e) => setJumlah_orang_tinggal(e.target.value)} type="number" />
                     <InputGroup.Prepend>
                        <InputGroup.Text>Orang</InputGroup.Text>
                     </InputGroup.Prepend>
                  </InputGroup>
                  <FormControl.Feedback type="invalid">{errors.jumlah_orang_tinggal}</FormControl.Feedback>
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
export default Rumahtinggalkeluarga;
