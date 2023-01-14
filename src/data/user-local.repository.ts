import { User } from 'src/domains/models/user';
import { IUserRepository } from '../domains/repositories';
import { NotFoundException, UnknownException } from '../exceptions';

export class UserLocalRepository implements IUserRepository {
  private readonly data: Map<string, User> = new Map();
  async create(user: User): Promise<void> {
    try {
      this.data.set(user.id, user);
      console.log('Save new user: ', this.data);
    } catch (error) {
      throw new UnknownException(error);
    }
  }
  async update(user: User): Promise<void> {
    try {
      this.data.set(user.id, user);
      console.log('Update user: ', this.data);
    } catch (error) {
      throw new UnknownException(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    for (const entry of Array.from(this.data.entries())) {
      const user = entry[1];
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findById(id: string): Promise<User> {
    const isUserNotExisted = !this.data.has(id);
    if (isUserNotExisted) return null;
    return this.data.get(id);
  }
}
