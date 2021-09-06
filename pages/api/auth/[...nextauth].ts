import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [

  ],
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
});
