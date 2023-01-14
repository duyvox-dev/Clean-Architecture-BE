import { IUserRepository } from '../domains';
import { NotFoundException } from '../exceptions';
import { UpdateAddressDto } from '../domains/dtos/update-address.dto';

export class UpdateAddressUseCaseInput {
  constructor(
    public readonly dto: UpdateAddressDto,
    public readonly userId: string,
    public readonly addressId: string
  ) {}
}

export class UpdateAddressUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(input: UpdateAddressUseCaseInput): Promise<string> {
    const { dto, userId, addressId } = input;

    const existedUser = await this.userRepository.findById(userId);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }

    const exitedAddress = existedUser.addresses.find((a) => a.id === addressId);
    if (!exitedAddress) {
      throw new NotFoundException('Address is not existed');
    }
    exitedAddress.updateInformation({ ...dto });
    existedUser.updateAddress(exitedAddress);
    await this.userRepository.update(existedUser);
    return 'Update Address successfully';
  }
}
