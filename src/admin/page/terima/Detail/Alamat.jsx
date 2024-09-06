import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Alamat = () => {
   const { terima } = useSelector((e) => e.admin);
   const { detailMahasiswa } = terima;

   return (
      <React.Fragment>
         <h4 className="card-title mb-4">Alamat</h4>
         <Row>
            <Col md={6} sm={12}>
               {h.detail_label("Kewarganegaraan", h.parseObject(detailMahasiswa, "kewarganegaraan"), 3)}
               {h.detail_label("Dusun", h.parseObject(detailMahasiswa, "dusun"), 3)}
               {h.detail_label("RW", h.parseObject(detailMahasiswa, "rw"), 3)}
               {h.detail_label("Kode Pos", h.parseObject(detailMahasiswa, "kode_pos"), 3)}
               {h.detail_label(
                  "Kecamatan",
                  `${h.parseObject(detailMahasiswa, "nama_provinsi")} - ${h.parseObject(detailMahasiswa, "nama_kabkota")} - ${h.parseObject(
                     detailMahasiswa,
                     "nama_kecamatan"
                  )}`,
                  3
               )}
               {h.detail_label("NIK", h.parseObject(detailMahasiswa, "nik"), 3)}
               {h.detail_label("Telephone", h.parseObject(detailMahasiswa, "telp"), 3)}
               {h.detail_label("HP", h.parseObject(detailMahasiswa, "hp"), 3)}
               {h.detail_label("Nomor KPS", h.parseObject(detailMahasiswa, "nomor_kps"), 3)}
            </Col>
            <Col md={6} sm={12}>
               {h.detail_label("NISN", h.parseObject(detailMahasiswa, "nisn"), 3)}
               {h.detail_label("Jalan", h.parseObject(detailMahasiswa, "jalan"), 3)}
               {h.detail_label("RT", h.parseObject(detailMahasiswa, "rt"), 3)}
               {h.detail_label("Kelurahan", h.parseObject(detailMahasiswa, "kelurahan"), 3)}
               {h.detail_label("Penerima KPS", h.parseObject(detailMahasiswa, "penerima_kps"), 3)}
               {h.detail_label("Jenis Tinggal", h.parseObject(detailMahasiswa, "nama_jenis_tinggal"), 3)}
               {h.detail_label("NPWP", h.parseObject(detailMahasiswa, "npwp"), 3)}
               {h.detail_label("Email", h.parseObject(detailMahasiswa, "email"), 3)}
               {h.detail_label("Alat Transportasi", h.parseObject(detailMahasiswa, "nama_alat_transportasi"), 3)}
            </Col>
         </Row>
      </React.Fragment>
   );
};
export default Alamat;
