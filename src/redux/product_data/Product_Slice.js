import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status: 'idle',
  items: [],
  error: ''
}

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const res = await axios.get('https://fakestoreapi.com/products')
     const data= res.data
      return data;
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

export const { setItems } = productsSlice.actions
export default productsSlice.reducer