import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
   
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.loading = true;
            
        },
        signInSuccess:(state,action) =>{
            state.currentUser = action.payload;
            state.loading = false;
         
        },
        signInFailure: (state) =>{
            state.loading = false;
           
        },
        signOut:(state) => {
            state.currentUser = null;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure,signOut} = userSlice.actions;

export default userSlice.reducer;