import React, { useLayoutEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setDetail, periodePendaftaran } from "root/redux/admin";

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
               return h.periode(data.semester);
            },
         },
         {
            data: null,
            class: "text-center",
            render: (data) => {
               if (data.status === "t") {
                  return "Aktif";
               } else {
                  return "Non Aktif";
               }
            },
         },
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
               <div className="float-end">
                  {h.buttons(`Tambah Periode Baru`, false, {
                     size: "sm",
                     onClick: () => dispatch(periodePendaftaran({ openModalTambah: true })),
                  })}
               </div>
               <Table
                  id="datatable"
                  bordered
                  className="dt-responsive nowrap"
                  style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
                  <thead>
                     <tr>
                        <th>PERIODE</th>
                        <th>STATUS</th>
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
