import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import adminProductsSlice from "../slices/admin/productsSlice";
import shopProductsSlice from "../slices/shop/productsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
  },
});

export default store;
