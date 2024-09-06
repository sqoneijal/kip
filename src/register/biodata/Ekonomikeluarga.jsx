import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, FormGroup, Row, FormLabel, Button, InputGroup } from "react-bootstrap";
import { post, notification } from "../../Helpers";

const Ekonomikeluarga = (props) => {
   const { biodata, setTabActive } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [penghasilan_ayah, setPenghasilan_ayah] = useState("");
   const [penghasilan_ibu, setPenghasilan_ibu] = useState("");

   // object
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setPenghasilan_ayah(biodata.penghasilan_ayah);
         setPenghasilan_ibu(biodata.penghasilan_ibu);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id_pendaftar: biodata.id_pendaftar,
         penghasilan_ayah: penghasilan_ayah,
         penghasilan_ibu: penghasilan_ibu,
      };

      setIsSubmit(true);
      post("/register/biodata/ekonomikeluarga", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("05");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>EKONOMI KELUARGA</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PENGHASILAN AYAH/WALI
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.penghasilan_ayah ? "has-danger" : ""}>
                     <InputGroup.Prepend>
                        <InputGroup.Text>Rp</InputGroup.Text>
                     </InputGroup.Prepend>
                     <FormControl value={penghasilan_ayah} onChange={(e) => setPenghasilan_ayah(e.target.value)} type="number" />
                  </InputGroup>
                  <FormControl.Feedback type="invalid">{errors.penghasilan_ayah}</FormControl.Feedback>
               </Col>
            </FormGroup>
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  PENGHASILAN IBU
               </FormLabel>
               <Col lg={9}>
                  <InputGroup className={errors.penghasilan_ibu ? "has-danger" : ""}>
                     <InputGroup.Prepend>
                        <InputGroup.Text>Rp</InputGroup.Text>
                     </InputGroup.Prepend>
                     <FormControl value={penghasilan_ibu} onChange={(e) => setPenghasilan_ibu(e.target.value)} type="number" />
                  </InputGroup>
                  <FormControl.Feedback type="invalid">{errors.penghasilan_ibu}</FormControl.Feedback>
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
export default Ekonomikeluarga;
