import React, { useLayoutEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { pendaftar as setPendaftar, closeDetail } from "root/redux/admin";

const ModalTolak = () => {
   const { pendaftar, detailContent } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [show, setShow] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   useLayoutEffect(() => {
      h.parseObject(pendaftar, "openModalTolak") && setShow(pendaftar.openModalTolak);
      return () => {};
   }, [pendaftar]);

   const clearProps = () => {
      dispatch(setPendaftar({ ...pendaftar, openModalTolak: false }));
   };

   const submit = () => {
      if (h.parseObject(input, "alasan_penolakan")) {
         let formData = { id: detailContent.id, alasan_penolakan: h.parseObject(input, "alasan_penolakan") };

         setIsSubmit(true);
         h.post("/admin/pendaftar/submittolak", formData)
            .then((res) => {
               const { data, status } = res;
               h.notification(data.status, data.msg_response);
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
         setErrors({ alasan_penolakan: "Alasan tidak boleh kosong." });
      }
   };

   return (
      <Modal show={show} onHide={clearProps} backdrop="static">
         <Modal.Header>
            <Modal.Title>Konfirmasi Penolakan</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form.Label>Alasan</Form.Label>
            <Form.Control
               as="textarea"
               rows={4}
               value={h.parseObject(input, "alasan_penolakan")}
               isInvalid={h.is_invalid(errors.alasan_penolakan)}
               onChange={(e) => setInput((prev) => ({ ...prev, alasan_penolakan: e.target.value }))}
            />
            {h.msg_response(errors.alasan_penolakan)}
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
export default ModalTolak;
