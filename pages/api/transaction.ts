import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { TransactionTypes } from '../../helper/transactionTypes';
import { PrismaClient } from '../../helper/PrismaClient';
import { getAccount } from "../../utils/getAccount";
import { getTransactions } from "../../utils/getTransactions";

const ALLOWED_METHOD = ['GET', 'POST'];

const sendMoney = async (currentUser: any, correspondentId: number, amount: number) => {
  const client = PrismaClient.getPrismaClient();

  const users = await client.user.findMany({
    where: {
      id: {
        in: [currentUser.id, correspondentId]
      }
    }
  });
  let currentAccount: any;
  let correspondentAccount: any;

  for (const user of users) {
    if (user.id === currentUser) {
      currentAccount = user;
    } else {
      correspondentAccount = user;
    }
  }

  const transactionUid = v4();

  const baseTransaction = {
    transaction_uid: transactionUid,
    amount,
  }

  const newCurrentUserBalance = currentAccount.balance - amount;
  const newCorrespondentBalance = correspondentAccount.balance + amount;

  const outboundTransaction = {
    ...baseTransaction,
    user_id: currentAccount.id,
    transaction_type_id: TransactionTypes.OUTBOUND,
    related_balance: newCurrentUserBalance
  };
  const inboundTransaction = {
    ...baseTransaction,
    user_id: correspondentAccount.id,
    transaction_type_id: TransactionTypes.INBOUND,
    related_balance: newCorrespondentBalance
  };

  await client.transaction.createMany({
    data: [
      inboundTransaction,
      outboundTransaction
    ],
    skipDuplicates: true,
  });

  await client.user.update({
    where: { id: currentAccount.id },
    data: { balance: newCurrentUserBalance }
  });
  await client.user.update({
    where: { id: correspondentAccount.id },
    data: { balance: newCorrespondentBalance }
  });
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (!req.method || !ALLOWED_METHOD.includes(req.method)) {
    res.setHeader('Allow', ALLOWED_METHOD);

    return res.status(405).send('Method Not Allowed');
  }

  const currentAccountResponse = await getAccount(req);

  if (!currentAccountResponse) return res.status(401).send('You are not authorized!');

  if (req.method === 'POST') {
    const { amount, correspondent_id } = req.body;

    await sendMoney(currentAccountResponse.user, correspondent_id, amount);

    return res.send('Transaction was successful');
  }

  const transactions = await getTransactions(req, currentAccountResponse.user);

  return res.send([transactions]);
};

export default handler;
