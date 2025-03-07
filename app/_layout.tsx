import { Provider } from 'react-redux';
import '../global.css';

import { Stack, useRouter } from 'expo-router';
import store from './redux/store/store';
import React, { useEffect } from 'react';
import { useAppSelector } from '~/hooks/useAppDispatch';

export default function Layout() {


  return (
    <Provider store={store}>
      <SubLayout />
    </Provider>
  );
}


function SubLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  return <Stack />
}