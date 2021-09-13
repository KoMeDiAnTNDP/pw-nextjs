import { getSession } from "next-auth/client";

import { AccountResponse } from '../dto/account';
import { PrismaClient } from '../helper/PrismaClient';

export const getAccount = async (req: any): Promise<AccountResponse | null> => {
  const session = await getSession({ req });

  if (!session || !session.user || !session.user.email) return null;

  const client = PrismaClient.getPrismaClient();
  const currentUser = await client.user.findUnique({
    where: { email: session.user.email }
  });

  if (!currentUser) return null;

  return {
    user: {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      balance: currentUser.balance,
    }
  };
};
