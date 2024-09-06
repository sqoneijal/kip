import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
   name: "admin",
   initialState: {
      init: {},
      filter: {},
      openDetail: false,
      detailContent: {},
      pendaftar: {},
      terima: {},
      tolak: {},
      wawancara: {},
      periodePendaftaran: {},
   },
   reducers: {
      resetRedux: (state) => {
         state = Object.assign(state, {
            filter: {},
            openDetail: false,
            detailContent: {},
            pendaftar: {},
            terima: {},
            tolak: {},
            wawancara: {},
            periodePendaftaran: {},
         });
      },
      closeDetail: (state) => {
         state = Object.assign(state, { detailContent: {}, openDetail: false });
      },
      setDetail: (state, { payload } = action) => {
         state = Object.assign(state, { detailContent: payload, openDetail: true });
      },
      init: (state, { payload } = action) => {
         state = Object.assign(state, { init: payload });
      },
      filter: (state, { payload } = action) => {
         state = Object.assign(state, { filter: payload });
      },
      pendaftar: (state, { payload } = action) => {
         state = Object.assign(state, { pendaftar: payload });
      },
      terima: (state, { payload } = action) => {
         state = Object.assign(state, { terima: payload });
      },
      tolak: (state, { payload } = action) => {
         state = Object.assign(state, { tolak: payload });
      },
      wawancara: (state, { payload } = action) => {
         state = Object.assign(state, { wawancara: payload });
      },
      periodePendaftaran: (state, { payload } = action) => {
         state = Object.assign(state, { periodePendaftaran: payload });
      },
   },
});
export const {
   init,
   filter,
   openDetail,
   detailContent,
   setDetail,
   resetRedux,
   closeDetail,
   pendaftar,
   terima,
   tolak,
   wawancara,
   periodePendaftaran,
} = admin.actions;
export default admin.reducer;
