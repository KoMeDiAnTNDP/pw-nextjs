import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Providers from 'next-auth/providers';

import { PrismaClient } from '../../../helper/PrismaClient';
import { defaultConfig } from "next/dist/server/config-shared";

type SignIn = {
  email: string,
  password: string,
}

let account: any;

const configuration: NextAuthOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    verificationOptions: {
      algorithms: ['HS512']
    }
  },
  providers: [
    Providers.Credentials({
      id: 'credentials',
      name: 'Login',
      authorize: async (credentials: Record<keyof SignIn, string>) => {
        const client = PrismaClient.getPrismaClient();
        const user = await client.user.findUnique({
          where: { email: credentials.email }
        });

        if (!!user) {
          account = {
            name: user.name,
            email: user.email,
            balance: user.balance
          };

          return account;
        } else {
          return null;
        }
      }
    })
  ],
  database: process.env.DATABASE_URL,
  callbacks: {
    signIn: async (user, account, profile) => !!user,
    session: async (session, userOrToken) =>  {
      if (!!account) {
        session.user = account;
      } else if (!!userOrToken.token && (!session.user || (!!session.user && !session.user.id))) {
        session.user = userOrToken.user;
      } else if (!!userOrToken) {
        session.token = userOrToken.token;
      }

      return session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (!!user) {
        token.user = user;
      }

      return token;
    }
  },
}

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, configuration);

export default handler;
