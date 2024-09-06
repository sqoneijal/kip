import React, { useLayoutEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { tolak as setTolak, closeDetail } from "root/redux/admin";

const ModalPerbaiki = () => {
   const { tolak, detailContent } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [show, setShow] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   useLayoutEffect(() => {
      h.parseObject(tolak, "openModalPerbaiki") && setShow(tolak.openModalPerbaiki);
      return () => {};
   }, [tolak]);

   const clearProps = () => {
      dispatch(setTolak({ ...tolak, openModalPerbaiki: false }));
   };

   const submit = () => {
      if (h.parseObject(input, "point_perbaiki")) {
         let formData = { id: detailContent.id, point_perbaiki: input.point_perbaiki };

         setIsSubmit(true);
         h.post("/admin/terima/submitperbaiki", formData)
            .then((res) => {
               const { data, status } = res;
               h.notification(data.status, data.msg_response, status);

               if (data.status) {
                  dispatch(setTolak({}));
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
         setErrors({ point_perbaiki: "Point yang harus diperbaiki tidak boleh kosong." });
      }
   };

   return (
      <Modal show={show} onHide={clearProps} backdrop="static">
         <Modal.Header>
            <Modal.Title>Konfirmasi Perbaiki</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form.Label>Point yang harus diperbaiki</Form.Label>
            <Form.Control
               as="textarea"
               rows={6}
               value={h.parseObject(input, "point_perbaiki")}
               isInvalid={h.is_invalid(errors.point_perbaiki)}
               onChange={(e) => setInput((prev) => ({ ...prev, point_perbaiki: e.target.value }))}
            />
            {h.msg_response(errors.point_perbaiki)}
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
export default ModalPerbaiki;
