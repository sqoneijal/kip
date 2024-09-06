import React, { useLayoutEffect, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { periodePendaftaran as setPeriodePendaftaran } from "root/redux/admin";

const ModalTambah = () => {
   const { periodePendaftaran } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [show, setShow] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   useLayoutEffect(() => {
      h.parseObject(periodePendaftaran, "openModalTambah") && setShow(periodePendaftaran.openModalTambah);
      return () => {};
   }, [periodePendaftaran]);

   const clearProps = () => {
      dispatch(setPeriodePendaftaran({ ...periodePendaftaran, openModalTambah: false }));
   };

   const submit = (e) => {
      e.preventDefault();
      let formData = {};
      Object.keys(input).map((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      h.post("/admin/periodependaftaran/submit", formData)
         .then((res) => {
            const { data, status } = res;
            setErrors(data.errors);
            h.notification(data.status, data.msg_response, status);

            if (data.status) {
               dispatch(setPeriodePendaftaran({ ...periodePendaftaran, openModalTambah: false }));
               h.handleFilterDatatable("/getdata", {});
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   return (
      <Modal show={show} onHide={clearProps} backdrop="static">
         <Modal.Header>
            <Modal.Title>Tambah Periode Pendaftaran</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Alert variant="danger">
               <p className="m-0 p-0">Jika ingin menambahkan periode baru, maka pastikan lagi tidak ada penerimaan pada periode sebelumnya.</p>
            </Alert>
            <div className="form-group">
               <Form.Label>Tahun Ajaran</Form.Label>
               <Form.Control
                  value={h.parseObject(input, "thn_ajaran")}
                  isInvalid={h.is_invalid(errors.thn_ajaran)}
                  onChange={(e) => setInput((prev) => ({ ...prev, thn_ajaran: e.target.value }))}
               />
               {h.msg_response(errors.thn_ajaran)}
            </div>
            <div className="form-group">
               <Form.Label>Semester</Form.Label>
               <Form.Control
                  as="select"
                  value={h.parseObject(input, "id_semester")}
                  isInvalid={h.is_invalid(errors.id_semester)}
                  onChange={(e) => setInput((prev) => ({ ...prev, id_semester: e.target.value }))}>
                  <option value="">--pilih--</option>
                  <option value="1">Ganjil</option>
                  <option value="2">Genap</option>
               </Form.Control>
               {h.msg_response(errors.id_semester)}
            </div>
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
export default ModalTambah;
