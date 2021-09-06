import React, { useState, FormEvent } from 'react';
import axios from 'axios';

import { TextField, Button, makeStyles } from '@material-ui/core';

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
    marginTop: 16,
    backgroundColor: '#e1bee7'
  }
})

export const Registration = () => {
  const styles = useStyles();

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

    const token = await axios.post(
      '/api/auth/registration',
      {
        name,
        email,
        password,
      },);
    console.log(token);
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.formContainer}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={event => setName(event.target.value)}
          error={!!nameError}
          helperText={nameError}
          className={styles.field}
        />
        <TextField
          fullWidth
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          className={styles.field}
        />
        <TextField
          fullWidth
          label="Repeat Password"
          value={repeatPassword}
          onChange={event => setRepeatPassword(event.target.value)}
          error={!!repeatPasswordError}
          helperText={repeatPasswordError}
          className={styles.field}
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
