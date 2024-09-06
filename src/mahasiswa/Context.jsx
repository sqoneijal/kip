import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { init as setInit } from "root/redux/mahasiswa";

const FormsUploadBerkas = React.lazy(() => import("./FormsUploadBerkas"));
const MenungguVerifikasi = React.lazy(() => import("./MenungguVerifikasi"));

const Context = () => {
   const { init } = useSelector((e) => e.mahasiswa);
   const { dashboard_step } = init;
   const dispatch = useDispatch();

   // bool
   const [isLoadingInit, setIsLoadingInit] = useState(true);

   const initMahasiswa = () => {
      h.get("/assets/initmahasiswa", {}, true)
         .then((res) => {
            const { data } = res;
            dispatch(setInit(data));
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingInit(false);
         });
   };

   useEffect(() => {
      const body = document.body;
      body.setAttribute("data-layout", "horizontal");

      initMahasiswa();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         {isLoadingInit ? (
            h.pageLoading()
         ) : (
            <div className="main-content">
               <div className="page-content mt-0">
                  <Container fluid>
                     <Suspense fallback={h.pageLoading()}>
                        {(() => {
                           switch (dashboard_step) {
                              case "1":
                              case "3":
                                 return <FormsUploadBerkas />;
                              case "2":
                              case "4":
                              case "5":
                                 return <MenungguVerifikasi />;
                           }
                        })()}
                     </Suspense>
                  </Container>
               </div>
            </div>
         )}
      </React.Fragment>
   );
};
export default Context;
