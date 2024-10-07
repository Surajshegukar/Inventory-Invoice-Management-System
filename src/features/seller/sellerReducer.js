import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSellers = createAsyncThunk("fetchSellers", async () => {
  try {
    const response = await fetch(
      "https://wkzhhy-5000.csb.app/api/seller/getsellers",
      {
        method: "GET",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
});

export const addSeller = createAsyncThunk(
  "addSeller",
  async (seller, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://wkzhhy-5000.csb.app/api/seller/addseller",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
          body: JSON.stringify(seller),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeSeller = createAsyncThunk(
  "removeSeller",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://wkzhhy-5000.csb.app/api/seller/deleteseller/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSeller = createAsyncThunk(
  "updateSeller",
  async (seller, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://wkzhhy-5000.csb.app/api/seller/updateseller/${seller._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
          body: JSON.stringify(seller),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sellerSlice = createSlice({
  name: "sellers",
  initialState: {
    sellers: [
      { name: "", mobile: "", email: "", address: "", panNo: "", gstNo: "" },
    ],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSellers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSellers.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers = action.payload;
    });
    builder.addCase(fetchSellers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addSeller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers.push(action.payload);
    });
    builder.addCase(addSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeSeller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers = state.sellers.filter(
        (seller) => seller._id !== action.payload
      );
    });
    builder.addCase(removeSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateSeller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers = state.sellers.map((seller) =>
        seller._id === action.payload._id ? action.payload : seller
      );
    });
    builder.addCase(updateSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sellerSlice.reducer;
