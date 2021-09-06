import { PrismaClient as PClient } from '@prisma/client';

export class PrismaClient {
  private static client: PClient;

  static getPrismaClient(): PClient {
    if (!this.client) {
      this.client = new PClient();
    }

    return this.client;
  }
}
