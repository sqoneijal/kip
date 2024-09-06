import React, { Suspense, useLayoutEffect, useState } from "react";
import { ButtonGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeDetail, tolak as setTolak } from "root/redux/admin";

const Biodata = React.lazy(() => import("./Biodata"));
const Lampiran = React.lazy(() => import("./Lampiran"));

const Context = () => {
   const { detailContent, tolak } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // string
   const [tabindex, setTabindex] = useState("1");

   const getDetail = (nim) => {
      const formData = { nim };

      setIsLoading(true);
      h.post("/admin/pendaftar/getdetail", formData)
         .then((res) => {
            const { data } = res;
            if (data.status) {
               dispatch(setTolak({ ...tolak, detailMahasiswa: data.content, detailPendaftar: detailContent }));
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
      if (h.objLength(detailContent)) getDetail(detailContent.nim);
      return () => {};
   }, [detailContent]);

   const menus = [
      { label: "Biodata", value: "1" },
      { label: "Lampiran", value: "2" },
   ];

   return isLoading ? (
      h.pageLoading()
   ) : (
      <Card className="shadow-sm">
         <Card.Body>
            <div className="float-end">
               <ButtonGroup>
                  {h.buttons(`Kembali ke halaman sebelumnya`, false, {
                     variant: "warning",
                     size: "sm",
                     onClick: () => dispatch(closeDetail()),
                  })}
               </ButtonGroup>
            </div>
            <ul className="nav nav-pills">
               {menus.map((row) => {
                  return (
                     <li className="nav-item waves-effect waves-light" key={row.value}>
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
   );
};
export default Context;
