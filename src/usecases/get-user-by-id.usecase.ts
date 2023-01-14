import { IUserRepository, User } from '../domains';
import { BadRequestionException, NotFoundException } from '../exceptions';

export class GetUserByIdUseCaseInput {
  constructor(public readonly id: string) {}
}

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: GetUserByIdUseCaseInput): Promise<User> {
    const { id } = input;
    if (!id) {
      throw new BadRequestionException('Missing user id');
    }
    const existedUser = await this.userRepository.findById(id);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }
    return existedUser;
  }
}
