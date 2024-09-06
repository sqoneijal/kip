import React from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import toastr from "toastr";
import moment from "moment";
import Swal from "sweetalert2";
import "./datatable/init";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export const periode = (semester) => {
   const tahun_ajaran = semester.toString().slice(0, -1);
   const id_semester = semester.toString().slice(4);

   const genap_ganjil_pendek = {
      1: "Ganjil",
      2: "Genap",
      3: "Pendek",
   };

   return `${tahun_ajaran}/${toInt(tahun_ajaran) + 1} ${genap_ganjil_pendek[id_semester]}`;
};

export const jekel = (key = null, callback = false) => {
   const array = [
      { value: "L", label: "Laki - Laki" },
      { value: "P", label: "Perempuan" },
   ];

   if (callback) {
      let out = "";
      array.map((row) => {
         if (row.value === key) out = row.label;
      });
      return out;
   } else {
      return array;
   }
};

export const detail_label = (label, value, span = 0, isLoading = false) => {
   return (
      <React.Fragment>
         <Row className="mb-2">
            <Form.Label className={`col-md-${span} col-12 fw-semibold text-muted`}>{label}</Form.Label>
            <Col md={12 - span} sm={12}>
               {isLoading ? <div className="placeholder" /> : <span className={`fw-bold fs-6 text-gray-800}`}>{value}</span>}
            </Col>
         </Row>
      </React.Fragment>
   );
};

export const serialize = (obj) => {
   let str = [];
   for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
   }
   return str.join("&");
};

export const objLength = (content = {}) => {
   return Object.keys(content).length > 0 ? true : false;
};

export const confirmSubmit = async ({ ...content }) => {
   const res = await Swal.fire({
      title: "Konfirmasi",
      text: content.message,
      icon: "question",
      cancelButtonText: "Tidak, batal",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, saya yakin!",
      buttonsStyling: false,
      allowOutsideClick: false,
      backdrop: true,
      customClass: {
         confirmButton: "btn btn-primary",
         cancelButton: "btn btn-danger ml-1",
      },
   });
   return res.isConfirmed;
};

export const arrLength = (content = []) => {
   return content.length > 0 ? true : false;
};

export const choose_file = (files = [], size) => {
   if (files.length > 0) {
      const type_allowed = ["image/jpeg", "image/png", "application/pdf", "image/x-png", "image/pjpeg"];
      if (type_allowed.includes(files[0].type)) {
         let _size = files[0].size;
         let fSExt = new Array("Bytes", "KB", "MB", "GB");
         let i = 0;
         while (_size > 900) {
            _size /= 1024;
            i++;
         }

         if (fSExt[i] === "KB" || fSExt[i] === "Bytes") {
            if (Math.round(_size * 100) / 100 <= size) {
               return {
                  status: true,
                  data: files[0],
               };
            } else {
               return {
                  status: false,
                  message: `Maksimal ukuran file ${size} KB dari ${Math.round(_size * 100) / 100} ${fSExt[i]}`,
               };
            }
         } else {
            return {
               status: false,
               message: `Maksimal ukuran file ${size} KB dari ${Math.round(_size * 100) / 100} ${fSExt[i]}`,
            };
         }
      } else {
         return {
            status: false,
            message: "File yang coba anda upload tidak diizinkan.",
         };
      }
   } else {
      return {
         status: false,
         message: "",
      };
   }
};

export const error_code_http = (code) => {
   const config = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      122: "Request-URI too long",
      127: "Network Authentication Required",
      150: "Continue",
      151: "Switching Protocols",
      152: "Processing",
      153: "Early Hints",
      158: "Request-URI too long",
      159: "Network Authentication Required",
      180: "Continue",
      181: "Switching Protocols",
      182: "Processing",
      183: "Early Hints",
      188: "Request-URI too long",
      189: "Network Authentication Required",
      199: "Network Authentication Required",
      200: "OK",
      201: "Created",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      250: "Continue",
      251: "Switching Protocols",
      252: "Processing",
      253: "Early Hints",
      258: "Request-URI too long",
      259: "Network Authentication Required",
      299: "Network Authentication Required",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      310: "Too many Redirect",
      399: "Client Closed Request",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      499: "Client Closed Request",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required",
      599: "Network Authentication Required",
   };

   if (typeof config[code] !== "undefined") {
      return config[code];
   } else {
      return "Terjadi sesuatu kesalahan";
   }
};

export const buttons = (label, isLoading, rest = {}) => {
   return (
      <Button className="w-md waves-effect waves-light" type="submit" disabled={isLoading} {...rest}>
         {isLoading ? "Loading..." : label}
      </Button>
   );
};

export const valid_date = (date) => {
   if (date != null) {
      const split = date.toString().split("-");
      let tahun, bulan, tanggal;
      if (split[0].length === 2) {
         tahun = split[2];
         bulan = split[1];
         tahun = split[0];
      } else {
         tahun = split[0];
         bulan = split[1];
         tanggal = split[2];
      }

      if (split.length === 3) {
         const m = moment(new Date(tahun, bulan, tanggal));
         if (m.isValid()) {
            return moment(new Date(tahun, bulan, tanggal)).format("YYYY-MM-DD");
         } else {
            return null;
         }
      }
   } else {
      return null;
   }
};

export const is_invalid = (key) => {
   return key ? true : false;
};

export const msg_response = (msg) => {
   return msg ? <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback> : "";
};

export const toInt = (string) => {
   if (isNaN(parseFloat(string))) {
      return 0;
   } else {
      return parseFloat(string);
   }
};

function checkIfValidUUID(str) {
   const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
   return regexExp.test(str);
}

export const parseObject = (content = {}, key) => {
   if (typeof content[key] !== "undefined") {
      let text = content[key];
      if (text == null) {
         return null;
      } else {
         text = text.toString();
         if (checkIfValidUUID(text)) {
            return text;
         } else {
            if (valid_date(text)) {
               return moment(text).format("YYYY-MM-DD");
            } else {
               if (text.slice(0, 1) == "0") {
                  return text.replace(/^\s+|\s+$/gm, "");
               } else {
                  if (text.replace(/\d/gm, "").length > 0) {
                     return text;
                  } else {
                     if (toInt(text) > 0) {
                        return toInt(text);
                     } else {
                        return text.replace(/^\s+|\s+$/gm, "");
                     }
                  }
               }
            }
         }
      }
   } else {
      return "";
   }
};

export const pageLoading = () => {
   return (
      <figure>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
      </figure>
   );
};

export const postUpload = (url, form = [], config = {}) => {
   let formData = new FormData();

   Object.keys(form).map((data) => {
      formData.append(data, form[data]);
   });

   return axios.post(url, formData, config);
};

export const post = (url, form = []) => {
   let formData = new FormData();

   Object.keys(form).map((data) => {
      formData.append(data, form[data]);
   });

   return axios.post(url, formData);
};

export const get = (url) => {
   return axios.get(url);
};

export const notification = (status, msg_response, code = 200) => {
   toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      showDuration: 300,
      hideDuration: 1000,
      timeOut: 5000,
      extendedTimeOut: 1000,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
   };

   if (status) {
      toastr.success(msg_response);
   } else {
      if (code === 200) {
         toastr.warning(msg_response);
      } else {
         toastr.error(msg_response);
      }
   }
};

export const tglIndo = (string) => {
   if (typeof string !== "undefined") {
      const tahun = string.split("-")[0];
      const bulan = string.split("-")[1];
      const tanggal = string.split("-")[2];

      const array_bulan = {
         "01": "Januari",
         "02": "Februari",
         "03": "Maret",
         "04": "April",
         "05": "Mei",
         "06": "Juni",
         "07": "Juli",
         "08": "Agustus",
         "09": "September",
         10: "Oktober",
         11: "November",
         12: "Desember",
      };

      return tanggal + " " + array_bulan[bulan] + " " + tahun;
   }
};

export const listAgama = [
   {
      value: "1",
      label: "Islam",
   },
   {
      value: "2",
      label: "Kristen",
   },
   {
      value: "3",
      label: "Hindu",
   },
   {
      value: "4",
      label: "Budha",
   },
   {
      value: "5",
      label: "Kong Hu Chu",
   },
   {
      value: "6",
      label: "Lainnya",
   },
];

export const listPekerjaanOrtu = [
   {
      value: "1",
      label: "PNS",
   },
   {
      value: "2",
      label: "Pegawas Swasta",
   },
   {
      value: "3",
      label: "Wirausaha",
   },
   {
      value: "4",
      label: "TNI/POLRI",
   },
   {
      value: "5",
      label: "Petani",
   },
   {
      value: "7",
      label: "Nelayan",
   },
   {
      value: "8",
      label: "Lainnya",
   },
];

export const listStatusOrtu = [
   {
      value: "1",
      label: "Kandung",
   },
   {
      value: "2",
      label: "Tiri",
   },
   {
      value: "3",
      label: "Angkat",
   },
   {
      value: "4",
      label: "Lainnya",
   },
];

export const pendidikanOrtu = [
   {
      value: "1",
      label: "Tidak Sekolah",
   },
   {
      value: "2",
      label: "SD/MI",
   },
   {
      value: "3",
      label: "SMP/MTS",
   },
   {
      value: "4",
      label: "SMA/MA",
   },
   {
      value: "5",
      label: "D1",
   },
   {
      value: "6",
      label: "D2/D3",
   },
   {
      value: "7",
      label: "S1/D4",
   },
   {
      value: "8",
      label: "S2",
   },
   {
      value: "9",
      label: "S3",
   },
];

export const keadaanOrtu = [
   {
      value: "1",
      label: "Masih Hidup",
   },
   {
      value: "2",
      label: "Sudah Wafat",
   },
   {
      value: "3",
      label: "Lainnya",
   },
];

export const kepemilikanRumah = [
   {
      value: "1",
      label: "Sendiri",
   },
   {
      value: "2",
      label: "Sewa tahunan",
   },
   {
      value: "3",
      label: "Sewa bulanan",
   },
   {
      value: "4",
      label: "Menumpang",
   },
   {
      value: "5",
      label: "Tidak memiliki",
   },
];

export const sumberListrik = [
   {
      value: "1",
      label: "PLN",
   },
   {
      value: "2",
      label: "Genset/Mandiri",
   },
   {
      value: "3",
      label: "Tenaga surya",
   },
   {
      value: "4",
      label: "PLN & Genset",
   },
   {
      value: "5",
      label: "Tidak ada",
   },
];

export const luasTanah = [
   {
      value: "1",
      label: "> 200 m2",
   },
   {
      value: "2",
      label: "100 - 200 m2",
   },
   {
      value: "3",
      label: "50-99 m2",
   },
   {
      value: "4",
      label: "< 25-50 m2",
   },
   {
      value: "5",
      label: "< 25 m2",
   },
];

export const luasBangunan = [
   {
      value: "1",
      label: "> 200 m2",
   },
   {
      value: "2",
      label: "100 - 200 m2",
   },
   {
      value: "3",
      label: "50-99 m2",
   },
   {
      value: "4",
      label: "< 25-50 m2",
   },
   {
      value: "5",
      label: "< 25 m2",
   },
];

export const mandiCuciKakus = [
   {
      value: "1",
      label: "Kepemilikan sendiri didalam",
   },
   {
      value: "2",
      label: "Kepemilikan sendiri diluar",
   },
   {
      value: "3",
      label: "Berbagi pakai",
   },
];

export const sumberAir = [
   {
      value: "1",
      label: "Kemasan",
   },
   {
      value: "2",
      label: "PDAM",
   },
   {
      value: "3",
      label: "Sumur",
   },
   {
      value: "4",
      label: "Sungai/Mata air/gunung",
   },
];

export const rencanaTempatTinggal = [
   {
      value: "1",
      label: "Bersama Keluarga / Kenalan",
   },
   {
      value: "2",
      label: "Kos / Sewa",
   },
   {
      value: "3",
      label: "Pesantren",
   },
   {
      value: "4",
      label: "Belum Ada",
   },
];

export const transportasiDariDaerahAsal = [
   {
      value: "1",
      label: "Pesawat Terbang",
   },
   {
      value: "2",
      label: "Kapal Laut",
   },
   {
      value: "3",
      label: "Kendaraan Darat",
   },
];

export const transportasiSeharihari = [
   {
      value: "1",
      label: "Sepeda Motor",
   },
   {
      value: "2",
      label: "Sepeda",
   },
   {
      value: "3",
      label: "Becak",
   },
   {
      value: "4",
      label: "Kendaraan Umum",
   },
   {
      value: "5",
      label: "Lainnya",
   },
];

export const formatRupiah = (bilangan) => {
   if (typeof bilangan !== "undefined") {
      var number_string = bilangan.toString(),
         sisa = number_string.length % 3,
         rupiah = number_string.substr(0, sisa),
         ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
         let separator = sisa ? "." : "";
         rupiah += separator + ribuan.join(".");
      }

      return rupiah;
   }
};

let dt;
const DatatableServerSide = ({ ...content }) => {
   let renderColumnDefs = [
      {
         targets: -1,
         data: null,
         orderable: false,
         className: "text-end",
         width: "5%",
         render: () => {
            let button_render = "";
            if (content.show_edit_button)
               button_render += `<a href="#" id="edit" class="btn btn-active-icon-warning btn-active-text-warning btn-sm p-0 m-0"><i class="ki-outline ki-notepad-edit fs-1"></i></a>`;
            if (content.show_delete_button)
               button_render += `<a href="#" id="delete" class="btn btn-active-icon-danger btn-active-text-danger btn-sm p-0 m-0"><i class="ki-outline ki-trash-square fs-1"></i></a>`;

            return button_render;
         },
      },
   ];

   dt = $("#datatable").DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      ajax: {
         url: `${window.location.pathname}${content.url}`,
         data: (e) => {
            return $.extend({}, e, content.filter);
         },
         type: "post",
         error: (xhr) => {
            if (xhr) notification(false, xhr.statusText);
         },
      },
      columns: content.columns,
      columnDefs: content.columnDefs ? renderColumnDefs : [],
      order: content.order,
      language: {
         paginate: {
            previous: "<i class='mdi mdi-chevron-left'>",
            next: "<i class='mdi mdi-chevron-right'>",
         },
      },
      initComplete: (settings, json) => {},
      drawCallback: (data) => {
         $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      createdRow: content.createdRow,
   });
};

export const handleFilterDatatable = (url, content = {}) => {
   dt.ajax.url(`${window.location.pathname}${url}?${serialize(content)}`).load();
};

export const handleSearchDatatable = (value) => {
   dt.search(value).draw();
};

export const initDatatable = ({ ...content }) => {
   return {
      reload: () => {
         dt.ajax.reload(null, false);
      },
      init: () => {
         DatatableServerSide(content);
      },
   };
};
