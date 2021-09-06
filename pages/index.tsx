import React, { SyntheticEvent, useState } from 'react';
import type { NextPage } from 'next'
import { Snackbar } from '@material-ui/core';

import { AppBar } from '../components/AppBar';
import { Layout } from '../components/Layout';
import { Alert } from '../components/Alert';
import { Authorization } from '../components/Authorization';

const Home: NextPage = () => {
  const [errorText, setErrorText] = useState<string>();

  const setError = (errorText?: string) => setErrorText(errorText);

  return (
    <Layout errorText={errorText} setError={setError}>
      <AppBar />
      <Authorization setError={setError} />
    </Layout>
  )
}

export default Home
