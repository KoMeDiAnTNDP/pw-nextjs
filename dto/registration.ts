export type RegistrationRequest = {
  email: string,
  name: string,
  password: string,
}

export type RegistrationResponse = {
  token: string,
  user: {
    name: string,
    email: string,
    balance: number,
  }
}
