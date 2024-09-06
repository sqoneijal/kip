import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { get } from "../Helpers";

const Finish = () => {
   // string
   const [is_diterima, setIs_diterima] = useState("");
   const [is_ditolak, setIs_ditolak] = useState("");
   const [alasanTolak, setAlasanTolak] = useState("");

   const getBiodata = () => {
      get("/register/getbiodatadaftar").then((res) => {
         const { data } = res;
         setIs_diterima(data.is_diterima);
         setIs_ditolak(data.is_ditolak);
         setAlasanTolak(data.content);
      });
   };

   useEffect(() => {
      getBiodata();
   }, []);

   return (
      <Container fluid={true}>
         <Row>
            <Col lg={12} md={12} sm={12}>
               <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">FINISH</h4>
               </div>
               <h6>Selamat anda berhasil mendaftar Beasiswa Kartu Indonesia Pintar (KIP)</h6>
               <p>Untuk tahap selanjutnya akan ada informasi yang akan dikirimkan ke email anda.</p>
               <p>
                  Status :{" "}
                  {(() => {
                     if (is_diterima === "f" && is_ditolak === "f") {
                        return <Badge variant="danger">Masih dalam proses</Badge>;
                     } else if (is_diterima === "f" && is_ditolak === "t") {
                        return <Badge variant="danger">Pengajuan anda ditolak</Badge>;
                     } else if (is_diterima === "t" && is_ditolak === "f") {
                        return (
                           <React.Fragment>
                              <Badge variant="success">Pengajuan anda diterima</Badge>
                              <br />
                              <br />
                              <Button variant="primary" size="sm" onClick={() => open("/register/biodata", "_parent")}>
                                 Klik disini untuk melengkapi biodata anda
                              </Button>
                           </React.Fragment>
                        );
                     }
                  })()}
               </p>
               {(() => {
                  if (is_diterima === "f" && is_ditolak === "t") {
                     return <p>{alasanTolak}</p>;
                  }
               })()}
            </Col>
         </Row>
      </Container>
   );
};
export default Finish;
