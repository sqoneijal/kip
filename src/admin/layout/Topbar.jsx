import React, { useLayoutEffect } from "react";
import lozad from "lozad";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = () => {
   const { init } = useSelector((e) => e.admin);
   const { user } = init;

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <header id="page-topbar">
            <div className="navbar-header">
               <div className="d-flex">
                  <div className="navbar-brand-box">
                     <Link to="pendaftar" className="logo logo-dark">
                        <span className="logo-sm">
                           <img data-src="/assets/image/logo.png" className="lozad" height="22" />
                        </span>
                        <span className="logo-lg">
                           <img data-src="/assets/image/logo.png" className="lozad" height="20" />
                        </span>
                     </Link>
                     <Link to="pendaftar" className="logo logo-light">
                        <span className="logo-sm">
                           <img data-src="/assets/image/logo.png" className="lozad" height="22" />
                        </span>
                        <span className="logo-lg">
                           <img data-src="/assets/image/logo.png" className="lozad" height="20" />
                        </span>
                     </Link>
                  </div>
                  <button
                     type="button"
                     className="btn btn-sm px-3 font-size-24 d-lg-none header-item"
                     data-bs-toggle="collapse"
                     data-bs-target="#topnav-menu-content">
                     <i className="ri-menu-2-line align-middle" />
                  </button>
               </div>
               <div className="d-flex">
                  <div className="dropdown d-inline-block user-dropdown">
                     <button type="button" className="btn header-item waves-effect">
                        <img className="rounded-circle header-profile-user lozad" data-src="/assets/image/avatar-placeholder.png" />
                        <span className="d-none d-xl-inline-block ms-1">{user.nama}</span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                     </button>
                     <div className="dropdown-menu dropdown-menu-end">
                        <div className="dropdown-divider" />
                        <a className="dropdown-item text-danger" href="/login/logout">
                           <i className="ri-shut-down-line align-middle me-1 text-danger" /> Logout
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </React.Fragment>
   );
};
export default Topbar;
