import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init } from "root/redux/admin";
import { Container } from "react-bootstrap";

const Topbar = React.lazy(() => import("./layout/Topbar"));
const Topnav = React.lazy(() => import("./layout/Topnav"));

import Pendaftar from "./page/pendaftar/Context";
import Terima from "./page/terima/Context";
import Tolak from "./page/tolak/Context";
import Wawancara from "./page/wawancara/Context";
import PeriodePendaftaran from "./page/periodependaftaran/Context";

const Context = () => {
   const dispatch = useDispatch();

   // bool
   const [isLoadingInit, setIsLoadingInit] = useState(true);

   useEffect(() => {
      const body = document.body;
      body.setAttribute("data-topbar", "dark");
      body.setAttribute("data-layout", "horizontal");
      body.setAttribute("data-bs-theme", "light");
      return () => {};
   }, []);

   const initAdmin = () => {
      h.get("/assets/initadmin")
         .then((res) => {
            const { data } = res;
            if (h.objLength(data.user)) {
               dispatch(init(data));
            } else {
               open("/login/logout", "_parent");
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingInit(false);
         });
   };

   useLayoutEffect(() => {
      initAdmin();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         {isLoadingInit ? (
            h.pageLoading()
         ) : (
            <BrowserRouter basename="admin">
               <Suspense fallback={h.pageLoading()}>
                  <Topbar />
                  <Topnav />
               </Suspense>
               <div className="main-content">
                  <div className="page-content">
                     <Container fluid>
                        <Routes>
                           <Route path="pendaftar" loader={h.pageLoading()} element={<Pendaftar />} />
                           <Route path="terima" loader={h.pageLoading()} element={<Terima />} />
                           <Route path="tolak" loader={h.pageLoading()} element={<Tolak />} />
                           <Route path="wawancara" loader={h.pageLoading()} element={<Wawancara />} />
                           <Route path="periodependaftaran" loader={h.pageLoading()} element={<PeriodePendaftaran />} />
                        </Routes>
                     </Container>
                  </div>
               </div>
            </BrowserRouter>
         )}
      </React.Fragment>
   );
};
export default Context;
