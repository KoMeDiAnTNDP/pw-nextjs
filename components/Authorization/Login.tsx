import React, { useState, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { TextField, makeStyles, Button } from '@material-ui/core';

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
  const [session, loading] = useSession();
  console.log(session, loading);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const test = await signIn(
      'credentials',
      { email, password, callbackUrl: '/account', redirect: false });
    console.log('test',test?.url);
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
