import { createSlice } from "@reduxjs/toolkit";

export const welcome = createSlice({
   name: "welcome",
   initialState: {
      init: {},
   },
   reducers: {
      init: (state, { payload } = action) => {
         state = Object.assign(state, { init: payload });
      },
   },
});
export const { init } = welcome.actions;
export default welcome.reducer;
