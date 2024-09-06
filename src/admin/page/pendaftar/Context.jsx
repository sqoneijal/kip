import React, { Suspense, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter as setFilter } from "root/redux/admin";

const Lists = React.lazy(() => import("./Lists"));
const Detail = React.lazy(() => import("./Detail/Context"));

const Context = () => {
   const { init, filter, openDetail } = useSelector((e) => e.admin);
   const { periode } = init;
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      const data = periode.filter((e) => e.status === "t");
      if (h.arrLength(data)) {
         dispatch(setFilter({ id_periode: data[0].id }));
      }
      return () => {};
   }, [periode]);

   return (
      <Suspense fallback={h.pageLoading()}>
         {(() => {
            if (openDetail) {
               return <Detail />;
            } else {
               return h.objLength(filter) && <Lists />;
            }
         })()}
      </Suspense>
   );
};
export default Context;
