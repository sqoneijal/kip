import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDetail } from "root/redux/admin";
import writeXlsxFile from "write-excel-file";
moment.locale("id");

let datatable;

const Lists = () => {
   const { filter } = useSelector((e) => e.admin);
   const dispatch = useDispatch();

   // bool
   const [isLoadingDownload, setIsLoadingDownload] = useState(false);

   const datatable_url = `/getdata?${h.serialize(filter)}`;
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

   const handleDownload = () => {
      setIsLoadingDownload(true);
      h.get("/admin/wawancara/handledownload")
         .then((res) => {
            const { data } = res;
            if (data.status) {
               if (data.content.length > 0) {
                  const header_1 = [
                     { value: "Data Mahasiswa", fontWeight: "bold", type: String, align: "center", alignVertical: "center", span: 9 },
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     { value: "Alamat", fontWeight: "bold", type: String, alignVertical: "center", align: "center", span: 18 },
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     null,
                     { value: "Ayah", fontWeight: "bold", type: String, alignVertical: "center", align: "center", span: 6 },
                     null,
                     null,
                     null,
                     null,
                     null,
                     { value: "Ibu", fontWeight: "bold", type: String, alignVertical: "center", align: "center", span: 6 },
                     null,
                     null,
                     null,
                     null,
                     null,
                     { value: "Wali", fontWeight: "bold", type: String, alignVertical: "center", align: "center", span: 5 },
                     null,
                     null,
                     null,
                     null,
                     { value: "HP/WA Orang Tua", fontWeight: "bold", type: String, alignVertical: "center", align: "center", rowSpan: 2 },
                     { value: "Nomor Kartu Sosial", fontWeight: "bold", type: String, alignVertical: "center", align: "center", rowSpan: 2 },
                     { value: "Nomor Invoice SPP", fontWeight: "bold", type: String, alignVertical: "center", align: "center", rowSpan: 2 },
                     { value: "Nilai Bayar SPP", fontWeight: "bold", type: String, alignVertical: "center", align: "center", rowSpan: 2 },
                     { value: "Tanggal Bayar SPP", fontWeight: "bold", type: String, alignVertical: "center", align: "center", rowSpan: 2 },
                  ];

                  const header_2 = [
                     { value: "NIM", fontWeight: "bold", type: String },
                     { value: "Nama Lengkap", fontWeight: "bold", type: String },
                     { value: "Jenis Kelamin", fontWeight: "bold", type: String },
                     { value: "Tanggal Lahir", fontWeight: "bold", type: String },
                     { value: "Tempat Lahir", fontWeight: "bold", type: String },
                     { value: "Agama", fontWeight: "bold", type: String },
                     { value: "Ukuran Baju", fontWeight: "bold", type: String },
                     { value: "Fakultas", fontWeight: "bold", type: String },
                     { value: "Program Studi", fontWeight: "bold", type: String },
                     { value: "Kewarganegaraan", fontWeight: "bold", type: String },
                     { value: "NISN", fontWeight: "bold", type: String },
                     { value: "Dusun", fontWeight: "bold", type: String },
                     { value: "Jalan", fontWeight: "bold", type: String },
                     { value: "RW", fontWeight: "bold", type: String },
                     { value: "RT", fontWeight: "bold", type: String },
                     { value: "Kode Pos", fontWeight: "bold", type: String },
                     { value: "Kelurahan", fontWeight: "bold", type: String },
                     { value: "Kecamatan", fontWeight: "bold", type: String },
                     { value: "Penerima KPS", fontWeight: "bold", type: String },
                     { value: "NIK", fontWeight: "bold", type: String },
                     { value: "Jenis Tinggal", fontWeight: "bold", type: String },
                     { value: "Telephone", fontWeight: "bold", type: String },
                     { value: "NPWP", fontWeight: "bold", type: String },
                     { value: "HP", fontWeight: "bold", type: String },
                     { value: "Email", fontWeight: "bold", type: String },
                     { value: "Nomor KPS", fontWeight: "bold", type: String },
                     { value: "Alat Transportasi", fontWeight: "bold", type: String },
                     { value: "NIK", fontWeight: "bold", type: String },
                     { value: "Nama", fontWeight: "bold", type: String },
                     { value: "Tanggal Lahir", fontWeight: "bold", type: String },
                     { value: "Pendidikan", fontWeight: "bold", type: String },
                     { value: "Pekerjaan", fontWeight: "bold", type: String },
                     { value: "Penghasilan", fontWeight: "bold", type: String },
                     { value: "NIK", fontWeight: "bold", type: String },
                     { value: "Nama", fontWeight: "bold", type: String },
                     { value: "Tanggal Lahir", fontWeight: "bold", type: String },
                     { value: "Pendidikan", fontWeight: "bold", type: String },
                     { value: "Pekerjaan", fontWeight: "bold", type: String },
                     { value: "Penghasilan", fontWeight: "bold", type: String },
                     { value: "Nama", fontWeight: "bold", type: String },
                     { value: "Tanggal Lahir", fontWeight: "bold", type: String },
                     { value: "Pendidikan", fontWeight: "bold", type: String },
                     { value: "Pekerjaan", fontWeight: "bold", type: String },
                     { value: "Penghasilan", fontWeight: "bold", type: String },
                  ];

                  const content = [];
                  data.content.map((row) => {
                     content.push([
                        { value: row.nim, type: String },
                        { value: row.nama, type: String },
                        { value: h.jekel(row.jekel, true), type: String },
                        { value: row.tgl_lahir && moment(row.tgl_lahir).format("DD MMMM YYYY"), type: String },
                        { value: row.tmp_lahir, type: String },
                        { value: row.nama_agama, type: String },
                        { value: row.ukuran_baju, type: String },
                        { value: row.nama_fakultas, type: String },
                        { value: row.nama_prodi, type: String },
                        { value: row.kewarganegaraan, type: String },
                        { value: row.nisn, type: String },
                        { value: row.dusun, type: String },
                        { value: row.jalan, type: String },
                        { value: row.rw, type: String },
                        { value: row.rt, type: String },
                        { value: row.kode_pos, type: String },
                        { value: row.kelurahan, type: String },
                        { value: `${row.nama_provinsi} - ${row.nama_kabkota} - ${row.nama_kecamatan}`, type: String },
                        { value: row.penerima_kps === "1" ? "Iya" : "Tidak", type: String },
                        { value: row.nik, type: String },
                        { value: row.nama_jenis_tinggal, type: String },
                        { value: row.telp, type: String },
                        { value: row.npwp, type: String },
                        { value: row.hp, type: String },
                        { value: row.email, type: String },
                        { value: row.nomor_kps, type: String },
                        { value: row.nama_alat_transportasi, type: String },
                        { value: row.nik_ayah, type: String },
                        { value: row.nama_ayah, type: String },
                        { value: row.tgl_lahir_ayah && moment(row.tgl_lahir_ayah).format("DD MMMM YYYY"), type: String },
                        { value: row.nama_jenjang_pend_ayah, type: String },
                        { value: row.nama_pekerjaan_ayah, type: String },
                        { value: row.nama_penghasilan_ayah, type: String },
                        { value: row.nik_ibu, type: String },
                        { value: row.nama_ibu, type: String },
                        { value: row.tgl_lahir_ibu && moment(row.tgl_lahir_ibu).format("DD MMMM YYYY"), type: String },
                        { value: row.nama_jenjang_pend_ibu, type: String },
                        { value: row.nama_pekerjaan_ibu, type: String },
                        { value: row.nama_penghasilan_ibu, type: String },
                        { value: row.nama_wali, type: String },
                        { value: row.tgl_lahir_wali && moment(row.tgl_lahir_wali).format("DD MMMM YYYY"), type: String },
                        { value: row.nama_jenjang_pend_wali, type: String },
                        { value: row.nama_pekerjaan_wali, type: String },
                        { value: row.nama_penghasilan_wali, type: String },
                        { value: data.pendaftar[row.nim].telp_ortu, type: String },
                        { value: data.pendaftar[row.nim].nomor_kartu_sosial, type: String },
                        { value: data.pendaftar[row.nim].no_invoice_spp, type: String },
                        { value: data.pendaftar[row.nim].nilai_spp, type: String },
                        { value: data.pendaftar[row.nim].tgl_bayar_spp, type: String },
                     ]);
                  });

                  writeXlsxFile([header_1, header_2, ...content], {
                     fileName: "wawancara.xlsx",
                  });
               } else {
                  h.notification(false, "Tidak ada data yang perlu di download.");
               }
            } else {
               h.notification(false, data.msg_response);
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
            setIsLoadingDownload(false);
         })
         .then(() => {
            setIsLoadingDownload(false);
         });
   };

   return (
      <Card className="shadow-sm">
         <Card.Body>
            <div className="float-end">
               {h.buttons(`Download Excel`, isLoadingDownload, {
                  size: "sm",
                  onClick: isLoadingDownload ? null : handleDownload,
               })}
            </div>
            <Table id="datatable" bordered className="dt-responsive nowrap" style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
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
   );
};
export default Lists;
