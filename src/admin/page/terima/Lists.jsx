import React, { useLayoutEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setDetail } from "root/redux/admin";

let datatable;

const Lists = () => {
   const { filter } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   let datatable_url = `/getdata?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: false,
      show_delete_button: false,
      url: datatable_url,
      columns: [
         {
            data: null,
            render: (data) => {
               return `<a href="#" id="nim">${data.nim}</a>`;
            },
         },
         { data: "nama" },
         { data: "email" },
         { data: "telp" },
         { data: "id_ukt", class: "text-center" },
         { data: "point_berkas_dok", class: "text-center" },
      ],
      columnDefs: false,
      createdRow: (row, data) => {
         const nim = row.querySelector("#nim");
         if (nim) {
            nim.onclick = (e) => {
               e.preventDefault();
               dispatch(setDetail(data));
            };
         }
      },
   });

   useLayoutEffect(() => {
      datatable.init();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <Card className="shadow-sm">
            <Card.Body>
               <Table
                  id="datatable"
                  bordered
                  className="dt-responsive nowrap"
                  style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
                  <thead>
                     <tr>
                        <th>NIM</th>
                        <th>NAMA</th>
                        <th>EMAIL</th>
                        <th>HP</th>
                        <th>UKT</th>
                        <th>POINT</th>
                     </tr>
                  </thead>
                  <tbody />
               </Table>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Lists;
