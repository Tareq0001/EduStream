import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { injectable, inject } from 'tsyringe';
import { RedisCache } from '../cache/RedisCache';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(RedisCache) private cache: RedisCache) {}

  async findById(id: string): Promise<User | null> {
    const cached = await this.cache.get(`user:${id}`);
    if (cached) {
      const data = JSON.parse(cached);
      return new User(data.id, data.name, data.email);
    }
    // mock DB call
    return null;
  }

  async save(user: User): Promise<void> {
    await this.cache.set(`user:${user.id}`, JSON.stringify(user));
  }
}
