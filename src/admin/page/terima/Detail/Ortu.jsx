import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
moment.locale("id");

const Ortu = () => {
   const { terima } = useSelector((e) => e.admin);
   const { detailMahasiswa } = terima;

   return (
      <React.Fragment>
         <Row>
            <Col md={6} sm={12}>
               <h4 className="card-title mb-4">Ayah</h4>
               {h.detail_label("NIK", h.parseObject(detailMahasiswa, "nik_ayah"), 3)}
               {h.detail_label("Nama", h.parseObject(detailMahasiswa, "nama_ayah"), 3)}
               {h.detail_label(
                  "Tanggal Lahir",
                  h.parseObject(detailMahasiswa, "tgl_lahir_ayah") && moment(h.parseObject(detailMahasiswa, "tgl_lahir_ayah")).format("DD MMMM YYYY"),
                  3
               )}
               {h.detail_label("Pendidikan", h.parseObject(detailMahasiswa, "nama_jenjang_pend_ayah"), 3)}
               {h.detail_label("Pekerjaan", h.parseObject(detailMahasiswa, "nama_pekerjaan_ayah"), 3)}
               {h.detail_label("Penghasilan", h.parseObject(detailMahasiswa, "nama_penghasilan_ayah"), 3)}
            </Col>
            <Col md={6} sm={12}>
               <h4 className="card-title mb-4">Ibu</h4>
               {h.detail_label("NIK", h.parseObject(detailMahasiswa, "nik_ibu"), 3)}
               {h.detail_label("Nama", h.parseObject(detailMahasiswa, "nama_ibu"), 3)}
               {h.detail_label(
                  "Tanggal Lahir",
                  h.parseObject(detailMahasiswa, "tgl_lahir_ibu") && moment(h.parseObject(detailMahasiswa, "tgl_lahir_ibu")).format("DD MMMM YYYY"),
                  3
               )}
               {h.detail_label("Pendidikan", h.parseObject(detailMahasiswa, "nama_jenjang_pend_ibu"), 3)}
               {h.detail_label("Pekerjaan", h.parseObject(detailMahasiswa, "nama_pekerjaan_ibu"), 3)}
               {h.detail_label("Penghasilan", h.parseObject(detailMahasiswa, "nama_penghasilan_ibu"), 3)}
            </Col>
         </Row>
      </React.Fragment>
   );
};
export default Ortu;
