import React, { Suspense, useLayoutEffect, useState } from "react";
import { Card, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeDetail, terima as setTerima } from "root/redux/admin";

const Biodata = React.lazy(() => import("./Biodata"));
const Lampiran = React.lazy(() => import("./Lampiran"));
const ModalTolak = React.lazy(() => import("./ModalTolak"));
const ModalPerbaiki = React.lazy(() => import("./ModalPerbaiki"));

const Context = () => {
   const { detailContent, terima } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingWawancara, setIsLoadingWawancara] = useState(false);

   // string
   const [tabindex, setTabindex] = useState("1");

   const getDetail = (nim) => {
      let formData = { nim: nim };

      setIsLoading(true);
      h.post("/admin/pendaftar/getdetail", formData)
         .then((res) => {
            const { data, status } = res;
            if (data.status) {
               dispatch(setTerima({ ...terima, detailMahasiswa: data.content, detailPendaftar: detailContent }));
            } else {
               h.notification(data.status, data.msg_response);
               dispatch(closeDetail());
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useLayoutEffect(() => {
      h.objLength(detailContent) && getDetail(detailContent.nim);
      return () => {};
   }, [detailContent]);

   const submitWawancara = (id) => {
      let formData = { id: id };

      setIsLoadingWawancara(true);
      h.post("/admin/terima/submitwawancara", formData)
         .then((res) => {
            const { data, status } = res;
            h.notification(data.status, data.msg_response, status);

            if (data.status) {
               dispatch(setTerima({}));
               dispatch(closeDetail());
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingWawancara(false);
         });
   };

   const menus = [
      { label: "Biodata", value: "1" },
      { label: "Lampiran", value: "2" },
   ];

   return (
      <React.Fragment>
         {isLoading ? (
            h.pageLoading()
         ) : (
            <React.Fragment>
               <Suspense fallback={h.pageLoading()}>
                  <ModalTolak />
                  <ModalPerbaiki />
               </Suspense>
               <Card className="shadow-sm">
                  <Card.Body>
                     <div className="float-end">
                        <ButtonGroup>
                           {h.buttons(`Peserta Wawancara`, false, {
                              size: "sm",
                              onClick: () =>
                                 h
                                    .confirmSubmit({
                                       message:
                                          "Apakah anda yakin ingin menjadikan sebagai tahap terakhir, yaitu sebagai calon penerimaan beasiswa. Anda tidak dapat membatalkan lagi pada tahap ini!",
                                    })
                                    .then((res) => {
                                       res && submitWawancara(detailContent.id);
                                    }),
                           })}
                           {h.buttons(`Izinkan untuk memperbaiki`, false, {
                              size: "sm",
                              variant: "info",
                              onClick: () => dispatch(setTerima({ ...terima, openModalPerbaiki: true })),
                           })}
                           {h.buttons(`Tolak`, false, {
                              variant: "danger",
                              size: "sm",
                              onClick: () => dispatch(setTerima({ ...terima, openModalTolak: true })),
                           })}
                           {h.buttons(`Kembali ke halaman sebelumnya`, false, {
                              variant: "warning",
                              size: "sm",
                              onClick: () => dispatch(closeDetail()),
                           })}
                        </ButtonGroup>
                     </div>
                     <ul className="nav nav-pills">
                        {menus.map((row, index) => {
                           return (
                              <li className="nav-item waves-effect waves-light" key={index}>
                                 <a
                                    className={`nav-link ${tabindex === row.value ? "active" : ""}`}
                                    href="#"
                                    onClick={(e) => {
                                       e.preventDefault();
                                       setTabindex(row.value);
                                    }}>
                                    <span className="d-none d-sm-block">{row.label}</span>
                                 </a>
                              </li>
                           );
                        })}
                     </ul>
                     <div className="tab-content p-3">
                        <div className="tab-pane active">
                           <Suspense fallback={h.pageLoading()}>
                              {(() => {
                                 switch (tabindex) {
                                    case "1":
                                       return <Biodata />;
                                    case "2":
                                       return <Lampiran />;
                                 }
                              })()}
                           </Suspense>
                        </div>
                     </div>
                  </Card.Body>
               </Card>
            </React.Fragment>
         )}
      </React.Fragment>
   );
};
export default Context;
