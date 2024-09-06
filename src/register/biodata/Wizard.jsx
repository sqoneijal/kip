import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { get, notification } from "../../Helpers";

const tabLists = [
   {
      value: "01",
      label: "DATA DIRI",
   },
   {
      value: "02",
      label: "KELUARGA",
   },
   {
      value: "03",
      label: "RUMAH",
   },
   {
      value: "04",
      label: "EKONOMI",
   },
   {
      value: "05",
      label: "PENDIDIKAN",
   },
   {
      value: "06",
      label: "RENCANA",
   },
   {
      value: "07",
      label: "CATATAN",
   },
   {
      value: "08",
      label: "LAMPIRAN",
   },
];

import Datadiri from "./Datadiri";
import Keluarga from "./Keluarga";
import Rumahtinggalkeluarga from "./Rumahtinggalkeluarga";
import Ekonomikeluarga from "./Ekonomikeluarga";
import Pendidikan from "./Pendidikan";
import Rencana from "./Rencana";
import Catatan from "./Catatan";
import Lampiran from "./Lampiran";

const Wizard = () => {
   // string
   const [tabActive, setTabActive] = useState("01");

   // object
   const [biodata, setBiodata] = useState({});

   const getBiodata = () => {
      get("/register/getdetailbiodata")
         .then((res) => {
            const { data } = res;
            if (data) {
               setBiodata(data);
            }
         })
         .catch((e) => notification(false, e.response.statusText));
   };

   useEffect(() => {
      getBiodata();
   }, []);

   return (
      <Container fluid={true}>
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Body>
                     <div className="twitter-bs-wizard">
                        <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                           {tabLists.map((data, key) => {
                              return (
                                 <li className="nav-item" key={key}>
                                    <a
                                       onClick={(e) => {
                                          e.preventDefault();
                                          if (biodata.is_complete === "t") {
                                             setTabActive(data.value);
                                          }
                                       }}
                                       href="#"
                                       className={"nav-link" + (tabActive === data.value ? " active" : "")}
                                    >
                                       <span className="step-number">{data.value}</span>
                                       <span className="step-title">{data.label}</span>
                                    </a>
                                 </li>
                              );
                           })}
                        </ul>
                        <div className="tab-content twitter-bs-wizard-tab-content">
                           {(() => {
                              switch (tabActive) {
                                 case "01":
                                    return <Datadiri biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "02":
                                    return <Keluarga biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "03":
                                    return <Rumahtinggalkeluarga biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "04":
                                    return <Ekonomikeluarga biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "05":
                                    return <Pendidikan biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "06":
                                    return <Rencana biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "07":
                                    return <Catatan biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                                 case "08":
                                    return <Lampiran biodata={biodata} setTabActive={(e) => setTabActive(e)} />;
                                    break;
                              }
                           })()}
                        </div>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
};
export default Wizard;
