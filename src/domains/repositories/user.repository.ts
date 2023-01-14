import { User } from '../models';

export interface IUserRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
