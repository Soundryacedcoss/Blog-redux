import { configureStore } from "@reduxjs/toolkit";
import slice from "./Slice";
const store = configureStore({
  reducer: {
    fetchPost: slice,
  },
});

export default store;
