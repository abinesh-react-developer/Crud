import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
}; 

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
        state.user = action.payload;
      }
  }
}); 

export const { setUserName } = userSlice.actions;         
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;   