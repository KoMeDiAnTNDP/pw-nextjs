import type { NextApiRequest, NextApiResponse } from 'next';

import { getAccount } from '../../utils/getAccount';
import { AccountResponse } from '../../dto/account';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AccountResponse | string>
) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');

    return res.status(405).send('Method Not Allowed');
  }

  const response = await getAccount(req);

  if (!response) {
    return res.status(401).send('You are not authorized!');
  }

  const account = response.user;

  return res.send({
    user: {
      email: account.email,
      name: account.name,
      balance: account.balance,
    }
  });
};

export default handler;
