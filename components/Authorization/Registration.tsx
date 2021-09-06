import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios, {  AxiosError, AxiosResponse } from 'axios';
import { TextField, Button, makeStyles } from '@material-ui/core';

import { useAppDispatch } from '../../store/hooks/hooks';
import { setUser, setToken } from '../../store/slices/userSlice';
import { RegistrationRequest, RegistrationResponse } from '../../dto/registration';

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

export const Registration = ({ setError }: Props) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data: { user, token } } = await axios.post<RegistrationRequest, AxiosResponse<RegistrationResponse>>(
        '/api/auth/registration',
        {
          name,
          email,
          password,
        });

      dispatch(setUser(user));
      dispatch(setToken(token));

      await router.push('/account');
    } catch (err) {
      const axiosError = err as AxiosError<string>;

      if (!!axiosError && axiosError.response) {
        setError(axiosError.response.data)
      }
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
          id="registration-email"
          fullWidth
          label="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          error={!!emailError}
          helperText={emailError}
          type="email"
        />
        <TextField
          id="registration-name"
          fullWidth
          label="Name"
          value={name}
          onChange={event => setName(event.target.value)}
          error={!!nameError}
          helperText={nameError}
          className={styles.field}
        />
        <TextField
          id="registration-password"
          fullWidth
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          className={styles.field}
          type="password"
        />
        <TextField
          id="registration-repeat-password"
          fullWidth
          label="Repeat Password"
          value={repeatPassword}
          onChange={event => setRepeatPassword(event.target.value)}
          error={!!repeatPasswordError}
          helperText={repeatPasswordError}
          className={styles.field}
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          disabled={!email || !name || !password}
          className={styles.submitButton}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};
