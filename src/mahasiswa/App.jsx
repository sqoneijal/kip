import React, { useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { init as setInit } from "~/redux/mahasiswa";
import store from "~/store";

const FormsUploadBerkas = React.lazy(() => import("./FormsUploadBerkas"));
const MenungguVerifikasi = React.lazy(() => import("./MenungguVerifikasi"));

const App = () => {
   const { init } = useSelector((e) => e.mahasiswa);
   const { dashboard_step } = init;
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initMahasiswa = () => {
      h.get("/assets/initmahasiswa", {}, true)
         .then((res) => {
            const { data } = res;
            if (!h.objLength(data)) {
               open("/", "_parent");
            }

            dispatch(setInit(data));
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useLayoutEffect(() => {
      const body = document.body;
      body.setAttribute("data-layout", "horizontal");
      initMahasiswa();
      return () => {};
   }, []);

   return isLoading ? (
      `Loading...`
   ) : (
      <div className="main-content">
         <div className="page-content mt-0">
            <Container fluid>
               <React.Suspense fallback={<div>Loading...</div>}>
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
               </React.Suspense>
            </Container>
         </div>
      </div>
   );
};
const container = document.getElementById("layout-wrapper");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);

if (process.env.NODE_ENV === "development") {
   new EventSource("http://localhost:8081/esbuild").addEventListener("change", () => location.reload());
}
