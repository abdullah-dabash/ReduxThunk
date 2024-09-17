import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
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
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
