import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import adminProductsSlice from "../slices/admin/productsSlice";

const store = configureStore({
  reducer: { auth: authReducer, adminProducts: adminProductsSlice },
});

export default store;
