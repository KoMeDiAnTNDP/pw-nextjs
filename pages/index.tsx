import React, { useState } from 'react';
import type { NextPage } from 'next'

import { AppBar } from '../components/AppBar';
import { Layout } from '../components/Layout';
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
