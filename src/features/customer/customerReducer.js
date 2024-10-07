import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk("fetchCustomers", async () => {
  try {
    const response = await fetch(
      "https://wkzhhy-5000.csb.app/api/customer/getallcustomers",
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
export const addCustomer = createAsyncThunk(
  "addCustomer",
  async (customer, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://wkzhhy-5000.csb.app/api/customer/addcustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
          body: JSON.stringify(customer),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCustomer = createAsyncThunk(
  "removeCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://wkzhhy-5000.csb.app/api/customer/deletecustomer/${id}`,
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

export const updateCustomer = createAsyncThunk(
  "updateCustomer",
  async (customer, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://wkzhhy-5000.csb.app/api/customer/updatecustomer/${customer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
          body: JSON.stringify(customer),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [
      {
        customerName: "John Doe",
        customerEmail: "johndoe@gmail.com",
        customerAddress: "USA",
        customerMobile: "1111222233",
      },
    ],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers.push(action.payload);
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = state.customers.filter(
        (customer) => customer._id !== action.payload._id
      );
    });
    builder.addCase(removeCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCustomer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = state.customers.map((customer) =>
        customer._id === action.payload._id ? action.payload : customer
      );
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default customerSlice.reducer;
