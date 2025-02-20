import { Provider } from 'react-redux';
import '../global.css';

import { Stack } from 'expo-router';
import store from './redux/store/store';
import React from 'react';

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
