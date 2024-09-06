import React from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import { BrowserRouter, Route } from "react-router-dom";

import Index from "./welcome/Index";
import Login from './Login'

const Welcome = () => {
   return (
      <>
         <ReactNotification />
         <BrowserRouter basename="/">
            <Route exact path="/" render={() => <Index />} />
            <Route exact path="/login" render={() => <Login />} />
         </BrowserRouter>
      </>
   );
};
ReactDOM.render(<Welcome />, document.getElementById("layout-wrapper"));
