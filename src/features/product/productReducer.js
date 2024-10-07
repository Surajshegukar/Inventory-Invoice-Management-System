import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  try{
    const response = await fetch('http://localhost:5000/api/product/getproducts',{
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

export const addProduct = createAsyncThunk('addProduct', async (product,{rejectWithValue}) => {
  try{
    const response = await fetch('http://localhost:5000/api/product/addproduct',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxODg2ODM4Nn0.DADwvRW_4NzcEGEZGwsIgh2yq88pfi_COzHftBjjVYU"
      },
      body: JSON.stringify(product)
    });
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
});

export const removeProduct = createAsyncThunk('removeProduct', async (id,{rejectWithValue}) => {
  try{
    const response = await fetch(`http://localhost:5000/api/product/deleteproduct/${id}`,{
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

export const updateProduct = createAsyncThunk('updateProduct', async (product,{rejectWithValue}) => {
  try{
    const response = await fetch(`http://localhost:5000/api/product/updateproduct/${product._id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MmZlYmFiZjc4ODY1MjA2ZTQ0YWZjIn0sImlhdCI6MTcxODg2ODM4Nn0.DADwvRW_4NzcEGEZGwsIgh2yq88pfi_COzHftBjjVYU"
      },
      body: JSON.stringify(product)
    });
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [{productName: "Product1", productCategory: "General", productPrice: "1"}],
    loading: false,
    error: null,
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchProducts.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action)=>{
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addProduct.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action)=>{
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeProduct.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(removeProduct.fulfilled, (state, action)=>{
      state.loading = false;
      state.products = state.products.filter((product)=>product._id !== action.payload);
    });
    builder.addCase(removeProduct.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduct.pending, (state, action)=>{
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action)=>{
      state.loading = false;
      state.products = state.products.map((product)=>product._id === action.payload._id?action.payload:product);
    });
    builder.addCase(updateProduct.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    });
    
  }
});

export default productSlice.reducer;
