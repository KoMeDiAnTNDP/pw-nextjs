import { getAccount } from './getAccount';

import { AccountResponse } from '../dto/account';
import { PrismaClient } from '../helper/PrismaClient';
import { TransactionTypes } from '../helper/transactionTypes';

export const getTransactions = async (req: any, user?: any) => {
  let currentUserResponse: AccountResponse | null = { user };

  if (!currentUserResponse.user) {
    currentUserResponse = await getAccount(req);
  }

  if (!currentUserResponse) return null;

  const currentUser = currentUserResponse.user;

  const client = PrismaClient.getPrismaClient();

  const ownTransactions = await client.transaction.findMany({
    where: { user_id: currentUser.id },
    include: {
      User: true
    }
  });
  const relatedTransactions = await client.transaction.findMany({
    where: {
      AND: [
        {
          transaction_uid: {
            in: ownTransactions.map(transaction => transaction.transaction_uid)
          }
        },
        {
          id: {
            notIn: ownTransactions.map(transaction => transaction.id)
          }
        }
      ]
    },
    include: {
      User: true
    }
  });

  return ownTransactions.map(transaction => {
    const isInbound = transaction.transaction_type_id === TransactionTypes.INBOUND;
    const transaction_type = isInbound ? 'inbound' : 'outbound';
    const relatedTransaction = relatedTransactions
      .find(relatedTransaction => relatedTransaction.transaction_uid === transaction.transaction_uid);

    return {
      date: transaction.createdAt,
      amount: transaction.amount,
      transaction_type,
      balance: transaction.related_balance,
      correspondent_name: relatedTransaction?.User?.name ?? null
    }
  }).filter(transaction => !!transaction.correspondent_name);
}
