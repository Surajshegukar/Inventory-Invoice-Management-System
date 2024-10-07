import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInvoices = createAsyncThunk("fetchInvoices", async () => {
  try {
    const response = await fetch(
      "https://wkzhhy-5000.csb.app/api/invoice/getallinvoices",
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

export const addInvoice = createAsyncThunk(
  "addInvoice",
  async (invoice, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://wkzhhy-5000.csb.app/api/invoice/addinvoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
          body: JSON.stringify(invoice),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeInvoice = createAsyncThunk(
  "removeInvoice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://wkzhhy-5000.csb.app/api/invoice/deleteinvoice/${id}`,
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

export const updateInvoice = createAsyncThunk(
  "updateInvoice",
  async (invoice, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://wkzhhy-5000.csb.app/api/invoice/updateinvoice/${invoice._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwM2M3MjBjNWQzODhiMTlhMjQ3YTdkIn0sImlhdCI6MTcyODMwMDgzMn0.qjRllEiHgA7ISD8z9CVlenOsMhBrdeP6KgDomnqwRHc",
          },
          body: JSON.stringify(invoice),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [
      {
        invoiceNo: 1,
        customerName: "John Doe",
        customerEmail: "johndoe@gmail.com",
        customerAddress: "USA",
        customerMobile: "1111222233",
        date: "2021-10-10",
        dueDate: "2021-10-20",
        products: [
          {
            productName: "Product 1",
            quantity: 1,
            price: 100,
          },
        ],
        status: "Cancelled",
      },
    ],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addInvoice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices.push(action.payload);
    });
    builder.addCase(addInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeInvoice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = state.invoices.filter(
        (invoice) => invoice._id !== action.payload._id
      );
    });
    builder.addCase(removeInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateInvoice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = state.invoices.map((invoice) =>
        invoice._id === action.payload._id ? action.payload : invoice
      );
    });
    builder.addCase(updateInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default invoiceSlice.reducer;
