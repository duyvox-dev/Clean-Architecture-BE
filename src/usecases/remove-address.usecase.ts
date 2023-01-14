import { NotFoundException } from '../exceptions';
import { IUserRepository } from '../domains';

export class RemoveAddressUseCaseInput {
  constructor(
    public readonly userId: string,
    public readonly addressId: string
  ) {}
}

export class RemoveAddressUseCase {
  constructor(public readonly userRepository: IUserRepository) {}
  public async execute(input: RemoveAddressUseCaseInput): Promise<string> {
    const { userId, addressId } = input;

    const existedUser = await this.userRepository.findById(userId);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }

    existedUser.removeAddress(addressId);
    await this.userRepository.update(existedUser);
    return 'Remove Address successfully';
  }
}
