import { authAPI } from "@/services/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from "redux-persist";
import { productsAPI } from "../services/products";
import { productSlice } from "./slices/productSlice";
import { emrAPI } from "@/services/emr";
import { emrSlice } from "./slices/emrSlice";
import imageSlice from "./slices/imageSlice";
import { appointmentAPI } from "@/services/appointment";
import { appointmentSlice } from "./slices/appointmentSlice";

// const persistConfig = {
//   key: "root_krushi",
//   storage: AsyncStorage,
//   whitelist: ["auth"],
// };

const rootReducer = combineReducers({
  [productsAPI.reducerPath]: reducerPath.reducer,
  product: productSlice.reducer,
});

//const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productsAPI.middleware),
});
//export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
