import type { NextPage } from 'next'

import { AppBar } from '../components/AppBar';
import { Layout } from '../components/Layout';
import { Authorization } from '../components/Authorization';

const Home: NextPage = () => {
  return (
    <Layout>
      <AppBar />
      <Authorization />
    </Layout>
  )
}

export default Home
