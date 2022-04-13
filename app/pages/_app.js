import theme from '../frontend/theme';
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


function MyApp({ Component, pageProps }) {
  /*
  const router = useRouter();

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeComplete', authCheck);
    }
  },[]);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const user = localStorage.getItem('user')
    if (user == null) {
      router.push('login');
    }
  }*/

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  );
}
export default MyApp
