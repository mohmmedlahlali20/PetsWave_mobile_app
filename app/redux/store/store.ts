import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Slice/authSlice'
import categorySlice from '../Slice/categorySlice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;