import React, { useLayoutEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { pendaftar as setPendaftar, closeDetail } from "root/redux/admin";

const ModalTerima = () => {
   const { pendaftar, detailContent } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [show, setShow] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   useLayoutEffect(() => {
      h.parseObject(pendaftar, "openModalTerima") && setShow(pendaftar.openModalTerima);
      return () => {};
   }, [pendaftar]);

   const clearProps = () => {
      dispatch(setPendaftar({ ...pendaftar, openModalTerima: false }));
   };

   const submit = () => {
      if (h.parseObject(input, "point_berkas_dok")) {
         let formData = { id: detailContent.id, point_berkas_dok: input.point_berkas_dok };

         setIsSubmit(true);
         h.post("/admin/pendaftar/submitterima", formData)
            .then((res) => {
               const { data, status } = res;
               h.notification(data.status, data.msg_response, status);

               if (data.status) {
                  dispatch(setPendaftar({}));
                  dispatch(closeDetail());
               }
            })
            .catch((e) => {
               h.notification(false, h.error_code_http(e.response.status), e.code);
            })
            .then(() => {
               setIsSubmit(false);
            });
      } else {
         setErrors({ point_berkas_dok: "Point tidak boleh kosong." });
      }
   };

   return (
      <Modal show={show} onHide={clearProps} backdrop="static">
         <Modal.Header>
            <Modal.Title>Konfirmasi Terima</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form.Label>Point</Form.Label>
            <Form.Control
               as="select"
               value={h.parseObject(input, "point_berkas_dok")}
               isInvalid={h.is_invalid(errors.point_berkas_dok)}
               onChange={(e) => setInput((prev) => ({ ...prev, point_berkas_dok: e.target.value }))}>
               <option value="">--pilih--</option>
               <option value="20">20</option>
               <option value="15">15</option>
               <option value="10">10</option>
               <option value="5">5</option>
            </Form.Control>
            {h.msg_response(errors.point_berkas_dok)}
         </Modal.Body>
         <Modal.Footer>
            {h.buttons(`Simpan`, isSubmit, {
               onClick: isSubmit ? null : submit,
            })}
            {h.buttons(`Batal`, false, {
               variant: "danger",
               onClick: () => clearProps(),
            })}
         </Modal.Footer>
      </Modal>
   );
};
export default ModalTerima;
