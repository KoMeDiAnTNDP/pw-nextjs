import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client';
import store from '../store';

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider options={{ clientMaxAge: 0 }} session={pageProps.session}>
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  </AuthProvider>
);

export default MyApp
