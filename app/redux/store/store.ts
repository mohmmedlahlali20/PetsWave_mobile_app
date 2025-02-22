import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Slice/authSlice'
import categorySlice from '../Slice/categorySlice'
import petSlice from '../Slice/petSlice'
import commandSlice from '../Slice/commandSlice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    pets: petSlice,
    command: commandSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;