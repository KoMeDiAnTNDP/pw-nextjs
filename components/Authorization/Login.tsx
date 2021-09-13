import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
import { TextField, makeStyles, Button } from '@material-ui/core';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';

const useStyles = makeStyles({
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  formContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 18,
    paddingBottom: 18,
    width: '100%',
  },
  field: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 22,
    backgroundColor: '#e1bee7'
  }
});

type Props = {
  setError: (errorText?: string) => void;
}

export const Login = ({ setError }: Props) => {
  const styles = useStyles();
  const [session] = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  useEffect(() => {
    if (!!session && !!session.user) {
      dispatch(setUser(session.user));

      router.push('/account');
    }
  }, [session]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await signIn(
        'credentials',
        { email, password, callbackUrl: '/account', redirect: false }
      );

      if (!!session) {
        dispatch(setUser(session.user));

        await router.push('/account');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formContainer}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="login-email"
          fullWidth
          label="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          error={!!emailError}
          helperText={emailError}
          type="email"
        />
        <TextField
          id="login-password"
          fullWidth
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          className={styles.field}
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          disabled={!email || !password}
          className={styles.submitButton}
        >
          Sign In
        </Button>
      </form>
    </div>
  )
};
