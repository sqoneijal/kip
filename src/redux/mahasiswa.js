import { createSlice } from "@reduxjs/toolkit";

export const mahasiswa = createSlice({
   name: "mahasiswa",
   initialState: {
      init: {},
   },
   reducers: {
      init: (state, { payload } = action) => {
         state = Object.assign(state, { init: payload });
      },
   },
});
export const { init } = mahasiswa.actions;
export default mahasiswa.reducer;
