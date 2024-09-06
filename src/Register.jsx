import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";

import Index from "./register/Index";
import Finish from "./register/Finish";
import Wizard from "./register/biodata/Wizard";

const Register = () => {
   return (
      <>
         <ReactNotification />
         <BrowserRouter basename="/register">
            <Route exact path="/" render={() => <Index />} />
            <Route exact path="/finish" render={() => <Finish />} />
            <Route exact path="/biodata" render={() => <Wizard />} />
         </BrowserRouter>
      </>
   );
};
ReactDOM.render(<Register />, document.getElementById("page-content"));
