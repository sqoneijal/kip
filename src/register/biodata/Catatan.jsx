import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Button } from "react-bootstrap";
import { post, notification } from "../../Helpers";

const Catatan = (props) => {
   const { biodata } = props;

   // string
   const [catatan, setCatatan] = useState("");

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   useEffect(() => {
      if (Object.keys(biodata).length > 0) {
         setCatatan(biodata.catatan);
      }
   }, [biodata]);

   const submit = (e) => {
      e.preventDefault();
      setIsSubmit(true);
      post("/register/biodata/catatan", { id_pendaftar: biodata.id_pendaftar, catatan: catatan })
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);

            if (data.status) {
               props.setTabActive("08");
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <div className="tab-pane active">
            <h3>CATATAN KHUSUS</h3>
            <hr />
            <FormGroup as={Row}>
               <FormLabel column lg={3}>
                  Catatan
               </FormLabel>
               <Col lg={9}>
                  <FormControl
                     value={catatan}
                     onChange={(e) => setCatatan(e.target.value)}
                     as="textarea"
                     placeholder="Silahkan ketikkan sesuatu catatan khusus yang berkaitan dengan anda..."
                     rows={10}
                  />
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
export default Catatan;
