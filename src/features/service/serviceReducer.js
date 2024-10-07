import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchServices = createAsyncThunk('fetchServices', async () => {
  try{
    const response = await fetch('http://localhost:5000/api/service/getservices',{
      method: 'GET',
      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxODg2ODM4Nn0.DADwvRW_4NzcEGEZGwsIgh2yq88pfi_COzHftBjjVYU"
      }
    });
    const result = await response.json();
    return result;
  }
  catch(error){
    return error;
  }
});

export const addService = createAsyncThunk('addService', async (service,{rejectWithValue}) => {
  try{
    const response = await fetch('http://localhost:5000/api/service/addservice',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxODg2ODM4Nn0.DADwvRW_4NzcEGEZGwsIgh2yq88pfi_COzHftBjjVYU"
      },
      body: JSON.stringify(service)
    });
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
});

export const removeService = createAsyncThunk('removeService', async (id,{rejectWithValue}) => {
  try{
    const response = await fetch(`http://localhost:5000/api/service/deleteservice/${id}`,{
      method: 'DELETE',
      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxODg2ODM4Nn0.DADwvRW_4NzcEGEZGwsIgh2yq88pfi_COzHftBjjVYU"
      }
    });
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
});

export const updateService = createAsyncThunk('updateService',async (service,{rejectWithValue})=>{
  try{
    const response = await fetch(`http://localhost:5000/api/service/updateservice/${service._id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxODg2ODM4Nn0.DADwvRW_4NzcEGEZGwsIgh2yq88pfi_COzHftBjjVYU"
      },
      body: JSON.stringify(service)
    });
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
});

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [{serviceName: "Services1", serviceCategory: "General", servicePrice: "1"}],
    loading: false,
    error: null,
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchServices.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(fetchServices.fulfilled, (state, action)=>{
      state.loading = false;
      state.services = action.payload;
    });
    builder.addCase(fetchServices.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addService.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(addService.fulfilled, (state, action)=>{
      state.loading = false;
      state.services.push(action.payload);
    });
    builder.addCase(addService.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeService.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(removeService.fulfilled, (state, action)=>{
      state.loading = false;
      state.services = state.services.filter((service)=>service._id !== action.payload);
    });
    builder.addCase(removeService.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateService.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(updateService.fulfilled, (state, action)=>{
      state.loading = false;
      state.services = state.services.map((service)=>service._id === action.payload._id ? action.payload : service);
    });
    builder.addCase(updateService.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default serviceSlice.reducer;
