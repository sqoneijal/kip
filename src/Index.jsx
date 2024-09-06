import React, { Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

const Welcome = React.lazy(() => import("./welcome/Index"));
const Login = React.lazy(() => import("./Login"));
const Admin = React.lazy(() => import("./admin/Context"));

const Index = () => {
   // string
   const [pathnameActive, setPathnameActive] = useState("");

   useEffect(() => {
      const location = window.location.href;
      const split_loc = location.split("/");
      setPathnameActive(split_loc[3]);
      return () => {};
   }, []);

   return (
      <Suspense fallback={h.pageLoading()}>
         {(() => {
            if (pathnameActive === "login") {
               return <Login />;
            } else if (pathnameActive === "admin") {
               return <Admin />;
            } else {
               return <Welcome />;
            }
         })()}
      </Suspense>
   );
};
const container = document.getElementById("layout-wrapper");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <Index />
   </Provider>
);
