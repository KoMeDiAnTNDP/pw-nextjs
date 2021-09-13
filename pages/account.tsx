import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signOut } from 'next-auth/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { getAccount } from '../utils/getAccount';
import { Layout } from "../components/Layout";
import { AppBar } from "../components/AppBar";
import { User } from "../components/User";
import { Transactions } from "../components/Transactions";

type Props = {
  account: {
    name: string;
    email: string;
    balance: number;
  }
}

const Account = ({ account }: Props) => {
  const [errorText, setErrorText] = useState<string>();

  const setError = (errorText?: string) => setErrorText(errorText);

  return (
    <Layout setError={setError} errorText={errorText}>
      <AppBar isAuthorized={!!account} />
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <User user={account} />
        <div>
          <Transactions />
        </div>
      </div>
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let account = null;

  try {
    const res = await getAccount(context.req);
    account = res?.user ?? null;
  } catch (e) {
    console.log('err', e);
  }

  return { props: { account } }
}

export default Account;
