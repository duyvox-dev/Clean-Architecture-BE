import { NotFoundException } from '../exceptions';
import { IUserRepository, AddAddressDto } from '../domains';
import { Address } from '../domains/models/address';

export class AddAddressUseCaseInput {
  constructor(public readonly dto: AddAddressDto, public userId: string) {}
}

export class AddAddressUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(input: AddAddressUseCaseInput): Promise<string> {
    const { dto, userId } = input;

    const existedUser = await this.userRepository.findById(userId);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }

    const address = new Address({
      ...dto
    });

    existedUser.addAddress(address);
    await this.userRepository.update(existedUser);
    return 'Add address successfully';
  }
}
