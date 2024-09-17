import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error || error.message);
    }
  }
);

// Add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error || error.message);
    }
  }
);

// Remove product
export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(product => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
