import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

import CachedIcon from '@material-ui/icons/Cached';

import parrotAvatar from '../public/parrot_avatar.svg';
import { AccountResponse } from '../dto/account';

type Account = {
  name: string;
  email: string;
  balance: number;
};

type Props = {
  user: Account
}

const useStyles = makeStyles({
  cardContainer: {
    minWidth: 350,
  },
  card: {
    position: 'relative',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000031',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    color: '#af8eb5',
  }
});

export const User = ({ user }: Props) => {
  const styles = useStyles();

  const [account, setAccount] = useState<Account>(user);
  const [loading, setLoading] = useState<boolean>(false);

  const updateAccountData = () => {
    setLoading(true);

    axios.get<AccountResponse>('api/account')
      .then(response => setAccount(response.data.user))
      .finally(() => setLoading(false));
  };

  return (
    <Card className={styles.cardContainer}>
      <div className={styles.card}>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: '#fff1ff' }}>
              <Image src={parrotAvatar} layout="fill" alt="parrot_avatar" />
            </Avatar>
          }
          title={account.name}
          subheader={account.email}
          action={
            <IconButton onClick={loading ? undefined : updateAccountData}>
              <CachedIcon />
            </IconButton>
          }
        />
        <CardContent>
          <span>Balance: {account.balance}</span>
        </CardContent>
        {loading && (<div className={styles.loaderContainer}>
          <CircularProgress size={50} className={styles.loader} />
        </div>)}
      </div>
    </Card>
  )
};
