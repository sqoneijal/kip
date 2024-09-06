import React from "react";
import { Alert, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const MenungguVerifikasi = () => {
   const { init } = useSelector((e) => e.mahasiswa);
   const { dashboard_step } = init;

   const listContent = [
      { label: "Formulir", value: "formulir", lampiran: true },
      { label: "Kartu KIP-K", value: "kartu_kip", lampiran: true },
      { label: "Kartu KKS", value: "kartu_kks", lampiran: true },
      { label: "Kartu PKH", value: "kartu_pkh", lampiran: true },
      { label: "Keterangan Kurang Mampu", value: "kurang_mampu", lampiran: true },
      { label: "Foto Diri", value: "foto", lampiran: true },
      { label: "KTP", value: "ktp", lampiran: true },
      { label: "Kartu Keluarga", value: "kartu_keluarga", lampiran: true },
      { label: "Ijazah", value: "ijazah", lampiran: true },
      { label: "Slip SPP/UKT", value: "slip_spp", lampiran: true },
      { label: "Keterangan Prestasi", value: "keterangan_prestasi", lampiran: true },
      { label: "Sertifikat Prestasi", value: "sertifikat_prestasi", lampiran: true },
      { label: "Keterangan Sakit", value: "surat_sakit", lampiran: true },
      { label: "Keterangan Disabilitas", value: "surat_disabilitas", lampiran: true },
      { label: "Pernyataan Kebenaran Data", value: "kebenaran_data", lampiran: true },
      { label: "Foto Rumah Tampak Depan Beserta Anggota Keluarga", value: "foto_rumah_keluarga", lampiran: true },
      { label: "Foto Kamar Mandi Rumah", value: "foto_rumah_kamar_mandi", lampiran: true },
      { label: "Foto Ruang Tamu Rumah", value: "foto_rumah_ruang_tamu", lampiran: true },
      { label: "Foto Dapur Rumah", value: "foto_rumah_dapur", lampiran: true },
      { label: "Bukti Pembayaran PDAM Bulan Terakhir", value: "pembayaran_pdam", lampiran: true },
      { label: "Bukti Pembayaran Listrik Bulan Terakhir", value: "pembayaran_listrik", lampiran: true },
      { label: "Rapor Kelas X (Semester I dan II)", value: "rapor_kelas_x", lampiran: true },
      { label: "Rapor Kelas XI (Semester I dan II)", value: "rapor_kelas_xi", lampiran: true },
      { label: "Rapor Kelas XII (Semester I dan II)", value: "rapor_kelas_xii", lampiran: true },
      { label: "Nomor Kartu Sosial", value: "nomor_kartu_sosial", lampiran: false },
      { label: "HP/WA Orang Tua", value: "telp_ortu", lampiran: false },
   ];

   return (
      <React.Fragment>
         {(() => {
            switch (dashboard_step) {
               case "2":
                  return (
                     <Alert variant="info">
                        <h3>Informasi</h3>
                        <p className="m-0">
                           Pengajuan program kartu indonesia pintar yang anda ajukan sedang dievaluasi oleh panitia. Mohon bersabar?
                        </p>
                     </Alert>
                  );
               case "4":
                  return (
                     <Alert variant="danger">
                        <h3>Informasi Evaluasi</h3>
                        <p className="m-0">Pengajuan program kartu indonesia pintar yang anda ajukan ditolak!</p>
                        {h.parseObject(init, "alasan_penolakan") && <p className="m-0">{h.parseObject(init, "alasan_penolakan")}</p>}
                     </Alert>
                  );
               case "5":
                  return (
                     <Alert variant="success">
                        <h3>Informasi Evaluasi</h3>
                        <p className="m-0">Pengajuan program kartu indonesia pintar yang anda ajukan telah diterima.</p>
                     </Alert>
                  );
            }
         })()}
         <Table>
            <thead>
               <tr>
                  <th className="text-center" style={{ width: "5%" }}>
                     NO
                  </th>
                  <th>Lampiran</th>
                  <th style={{ textAlign: "right" }}>Bukti</th>
               </tr>
            </thead>
            <tbody>
               {listContent.map((row, index) => {
                  return (
                     <tr key={row.label}>
                        <td className="text-center">{index + 1}</td>
                        <td>{row.label}</td>
                        <td style={{ textAlign: "right" }}>
                           {row.lampiran && h.parseObject(init, row.value) && (
                              <a href={`https://drive.google.com/file/d/${init[row.value]}/view`} target="_blank">
                                 Lihat
                              </a>
                           )}
                           {!row.lampiran && h.parseObject(init, row.value)}
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </React.Fragment>
   );
};
export default MenungguVerifikasi;
