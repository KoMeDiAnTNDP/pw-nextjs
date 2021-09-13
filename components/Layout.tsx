import React, { FC, PropsWithChildren, SyntheticEvent, useState } from 'react';
import Head from 'next/head';
import { Snackbar } from '@material-ui/core';

import { Alert } from './Alert';

import styles from '../styles/Home.module.css';

type Props = {
  title?: string;
  errorText?: string;
  setError: (errorText?: string) => void;
};

export const Layout: FC<Props> = (
  {
    title = 'PW: Parrot Wings',
    errorText,
    setError,
    children
  }: PropsWithChildren<Props>) => {
  const handleCloseSnackbar = (event: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;

    setError();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        {children}
        <Snackbar
          open={!!errorText}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
            {errorText}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};
