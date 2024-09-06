import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { post, notification } from "../../Helpers";

const ModalKonfirmasi = (props) => {
   const { biodata, openModalKonfirmasi } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   const simpanDanAkhiri = () => {
      setIsSubmit(true);
      post("/register/biodata/simpandanakhiri", { id_pendaftar: biodata.id_pendaftar })
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
            if (data.status) {
               setTimeout(() => {
                  location.reload();
               }, 500);
            }
         })
         .catch((e) => notification(false, e.response.statusText))
         .then(() => setIsSubmit(false));
   };

   return (
      <Modal show={openModalKonfirmasi} onHide={() => props.setOpenModalKonfirmasi(false)} backdrop="static" keyboard={false} animation={true}>
         <Modal.Header closeButton>
            <Modal.Title>Konfirmasi</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>Apakah anda sudah yakin dengan semua isian biodata anda.</p>
            <p>
               Setelah menekan tombol <strong style={{ fontWeight: "bold", fontSize: 20 }}>Simpan dan Akhiri</strong>, Anda tidak dapat{" "}
               <strong style={{ fontWeight: "bold", fontSize: 20 }}>membatalkan atau memperbarui</strong> semua data yang telah Anda isi
            </p>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="danger" onClick={() => props.setOpenModalKonfirmasi(false)}>
               Batal
            </Button>
            <Button onClick={isSubmit ? null : simpanDanAkhiri} variant="primary">
               {isSubmit ? "Loading..." : "Simpan dan Akhiri"}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalKonfirmasi;
