import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { get } from "../Helpers";

const Topbar = () => {
   // string
   const [avatar, setAvatar] = useState("");
   const [nim, setNim] = useState("");
   const [nama, setNama] = useState("");

   const getBiodata = () => {
      get("/register/getbiodata").then((res) => {
         const { data } = res;

         setAvatar("https://pendaftaran.ar-raniry.ac.id/upload/" + data.id_calon + "/" + data.avatar);
         setNama(data.nama);
         setNim(data.nim);
      });
   };

   useEffect(() => {
      getBiodata();
   }, []);

   return (
      <div className="navbar-header">
         <div className="d-flex">
            <div className="navbar-brand-box">
               <a href="/" className="logo logo-dark">
                  <span className="logo-sm">
                     <LazyLoadImage
                        effect="blur"
                        src="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png?height=22"
                        alt="KIP UIN Ar Raniry"
                     />
                  </span>
                  <span className="logo-lg">
                     <LazyLoadImage
                        effect="blur"
                        src="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png?height=20"
                        alt="KIP UIN Ar Raniry"
                     />
                  </span>
               </a>
               <a href="/" className="logo logo-light">
                  <span className="logo-sm">
                     <LazyLoadImage
                        effect="blur"
                        src="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png?height=22"
                        alt="KIP UIN Ar Raniry"
                     />
                  </span>
                  <span className="logo-lg">
                     <LazyLoadImage
                        effect="blur"
                        src="https://abjgyjvqwq.cloudimg.io/v7/https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png?height=20"
                        alt="KIP UIN Ar Raniry"
                     />
                  </span>
               </a>
            </div>
         </div>
         <div className="d-flex">
            <div className="dropdown d-inline-block user-dropdown">
               <button className="btn header-item waves-effect">
                  <LazyLoadImage effect="blur" className="rounded-circle header-profile-user" src={avatar} alt={nama} />
                  <span className="d-none d-xl-inline-block ml-1">{nim + " : " + nama}</span>
               </button>
            </div>
         </div>
      </div>
   );
};
ReactDOM.render(<Topbar />, document.getElementById("page-topbar"));
