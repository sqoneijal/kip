import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
moment.locale("id");

const Wali = () => {
   const { pendaftar } = useSelector((e) => e.admin);
   const { detailMahasiswa } = pendaftar;

   return (
      <React.Fragment>
         <Row>
            <Col md={6} sm={12}>
               <h4 className="card-title mb-4">Wali</h4>
               {h.detail_label("Nama", h.parseObject(detailMahasiswa, "nama_wali"), 3)}
               {h.detail_label(
                  "Tanggal Lahir",
                  h.parseObject(detailMahasiswa, "tgl_lahir_wali") && moment(h.parseObject(detailMahasiswa, "tgl_lahir_wali")).format("DD MMMM YYYY"),
                  3
               )}
               {h.detail_label("Pendidikan", h.parseObject(detailMahasiswa, "nama_jenjang_pend_wali"), 3)}
               {h.detail_label("Pekerjaan", h.parseObject(detailMahasiswa, "nama_pekerjaan_wali"), 3)}
               {h.detail_label("Penghasilan", h.parseObject(detailMahasiswa, "nama_penghasilan_wali"), 3)}
            </Col>
         </Row>
      </React.Fragment>
   );
};
export default Wali;
