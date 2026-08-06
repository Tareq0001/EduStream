import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { injectable, inject } from 'tsyringe';

@injectable()
export class GetUserUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
