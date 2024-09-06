import React, { Suspense } from "react";

const DataMahasiswa = React.lazy(() => import("./DataMahasiswa"));
const Alamat = React.lazy(() => import("./Alamat"));
const Ortu = React.lazy(() => import("./Ortu"));
const Wali = React.lazy(() => import("./Wali"));

const Biodata = () => {
   return (
      <React.Fragment>
         <h4 className="card-title mb-4">Data Mahasiswa</h4>
         <Suspense fallback={h.pageLoading()}>
            <DataMahasiswa />
            <Alamat />
            <Ortu />
            <Wali />
         </Suspense>
      </React.Fragment>
   );
};
export default Biodata;
