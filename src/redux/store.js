import { configureStore } from "@reduxjs/toolkit";
import starredReducer from "../redux/starredSlice";

const store = configureStore({
    reducer: {
        starred: starredReducer
    }
})

export default store;