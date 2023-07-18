import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        cartList: cartSlice.reducer,
        user: authSlice.reducer
    }
})
export default store;