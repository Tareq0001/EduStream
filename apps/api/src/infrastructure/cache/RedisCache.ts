import { createClient } from 'redis';

export class RedisCache {
  private client;

  constructor() {
    this.client = createClient();
    this.client.connect().catch(console.error);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}
