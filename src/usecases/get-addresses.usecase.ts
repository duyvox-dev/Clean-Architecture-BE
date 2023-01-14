import { IUserRepository } from '../domains';
import {
  AddressResponse,
  createAddressResponse
} from '../domains/dtos/address.response';
import { NotFoundException } from '../exceptions/not-found.exception';

export class GetAddressUseCaseInput {
  constructor(public readonly userId: string) {}
}

export class GetAddressesUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(
    input: GetAddressUseCaseInput
  ): Promise<AddressResponse[]> {
    const { userId } = input;
    const existedUser = await this.userRepository.findById(userId);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }

    const response = existedUser.addresses.map((a) => createAddressResponse(a));
    return response;
  }
}
