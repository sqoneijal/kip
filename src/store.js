import { configureStore } from "@reduxjs/toolkit";
import admin from "./redux/admin";
import mahasiswa from "./redux/mahasiswa";
import welcome from "./redux/welcome";

export default configureStore({
   reducer: {
      welcome,
      mahasiswa,
      admin,
   },
});
