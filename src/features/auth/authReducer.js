

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk('login', async (user, {rejectWithValue}) => {
    try{
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
}

);

export const register = createAsyncThunk('register', async (user, {rejectWithValue}) => {
    try{
        const response = await fetch('http://localhost:5000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
}

);

export const getUser = createAsyncThunk('getUser', async (token, {rejectWithValue}) => {
    try{
        const response = await fetch('http://localhost:5000/api/auth/getuser',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
}

);
export const updateUser = createAsyncThunk('updateUser', async (user, {rejectWithValue}) => {
    try{
        const response = await fetch(`http://localhost:5000/api/auth/updateuser/${user._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxOTIxNjgwMn0.L1ANTZ8dEYLGlYZegeqmjaflxBkjKAp0KHhLRQmiagg"
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
}

);

const auth = createSlice({
    name:"auth",
    initialState:{
        token: null,
        user: null,
        error: null,
        loading: false
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action.payload;
        });
        builder.addCase(login.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(register.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        });
        builder.addCase(register.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getUser.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateUser.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        
    }
});

export default auth.reducer;