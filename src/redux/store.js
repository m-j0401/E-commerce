
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './product_data/Product_Slice.js'

 const store = configureStore({
  reducer: {
    products: productsReducer
  }
})

export default store;