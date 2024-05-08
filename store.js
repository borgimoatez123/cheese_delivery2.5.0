import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./app/redux/CartReducer";

export default configureStore({
    reducer:{
        cart:CartReducer
    }
})