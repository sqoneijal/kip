import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
moment.locale("id");

const DataMahasiswa = () => {
   const { tolak } = useSelector((e) => e.admin);
   const { detailMahasiswa } = tolak;

   return (
      <React.Fragment>
         <Row>
            <Col md={6} sm={12}>
               {h.detail_label("Nama Lengkap", h.parseObject(detailMahasiswa, "nama"), 3)}
               {h.detail_label("Jenis Kelamin", h.jekel(h.parseObject(detailMahasiswa, "jekel"), true), 3)}
               {h.detail_label(
                  "Tanggal Lahir",
                  h.parseObject(detailMahasiswa, "tgl_lahir") && moment(h.parseObject(detailMahasiswa, "tgl_lahir")).format("DD MMMM YYYY"),
                  3
               )}
               {h.detail_label("Fakultas", h.parseObject(detailMahasiswa, "nama_fakultas"), 3)}
            </Col>
            <Col md={6} sm={12}>
               {h.detail_label("Tempat Lahir", h.parseObject(detailMahasiswa, "tmp_lahir"), 3)}
               {h.detail_label("Agama", h.parseObject(detailMahasiswa, "nama_agama"), 3)}
               {h.detail_label("Ukuran Baju", h.parseObject(detailMahasiswa, "ukuran_baju"), 3)}
               {h.detail_label("Program Studi", h.parseObject(detailMahasiswa, "nama_prodi"), 3)}
            </Col>
         </Row>
      </React.Fragment>
   );
};
export default DataMahasiswa;
