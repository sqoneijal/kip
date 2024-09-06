import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetRedux } from "root/redux/admin";

const Topnav = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const menus = [
      {
         label: "Pendaftar",
         pathname: "/pendaftar",
         icon: "ri-dashboard-line me-2",
      },
      {
         label: "Di Terima",
         pathname: "/terima",
         icon: "ri-dashboard-line me-2",
      },
      {
         label: "Di Tolak",
         pathname: "/tolak",
         icon: "ri-dashboard-line me-2",
      },
      {
         label: "Wawancara",
         pathname: "/wawancara",
         icon: "ri-dashboard-line me-2",
      },
      {
         label: "Periode Pendaftaran",
         pathname: "/periodependaftaran",
         icon: "ri-dashboard-line me-2",
      },
   ];

   return (
      <React.Fragment>
         <div className="topnav">
            <div className="container-fluid">
               <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                  <div className="collapse navbar-collapse" id="topnav-menu-content">
                     <ul className="navbar-nav active">
                        {menus.map((row, index) => {
                           return (
                              <li className="nav-item" key={index}>
                                 {(() => {
                                    if (location.pathname === row.pathname) {
                                       return (
                                          <span className="nav-link active">
                                             <i className={row.icon} /> {row.label}
                                          </span>
                                       );
                                    } else {
                                       return (
                                          <Link className="nav-link" to={row.pathname} onClick={() => dispatch(resetRedux())}>
                                             <i className={row.icon} /> {row.label}
                                          </Link>
                                       );
                                    }
                                 })()}
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </nav>
            </div>
         </div>
      </React.Fragment>
   );
};
export default Topnav;
