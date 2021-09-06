import type { NextApiRequest, NextApiResponse } from 'next'
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { PrismaClient } from '../../../helper/PrismaClient';
import { RegistrationResponse, RegistrationRequest } from '../../../dto/registration';

const ROUNDS = 10;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RegistrationResponse | string>
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method Not Allowed');
  }

  const { email, name, password } = req.body as RegistrationRequest;

  if (!email || !name || !password) {
    return res.status(400).send('Wrong body!');
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).send('Create JWT secret');
  }

  const salt = await genSalt(ROUNDS);
  const passwordHash = await hash(password, salt);

  const client = PrismaClient.getPrismaClient();

  const existingUser = await client.user.findUnique({
    where: { email }
  });

  if (!!existingUser) {
    console.log('error')
    return res.status(400).send('User with this credentials already exist');
  }

  const newUser = await client.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    }
  });

  const token = sign(
    { email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' },
  );

  return res.send({
    token,
    user: {
      email: newUser.email,
      name: newUser.name,
      balance: newUser.balance
    },
  });
}

export default handler;