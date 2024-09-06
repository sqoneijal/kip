import React, { Suspense } from "react";

const Lists = React.lazy(() => import("./Lists"));
const ModalTambah = React.lazy(() => import("./ModalTambah"));

const Context = () => {
   return (
      <React.Fragment>
         <Suspense fallback={h.pageLoading()}>
            <ModalTambah />
            <Lists />
         </Suspense>
      </React.Fragment>
   );
};
export default Context;
