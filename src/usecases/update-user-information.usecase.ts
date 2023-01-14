import { IUserRepository, PhoneNumber, Username } from '../domains';
import { BadRequestionException, NotFoundException } from '../exceptions';
import { UpdateUserInformationDto } from '../domains';

export class UpdateUserInformationInput {
  constructor(
    public readonly dto: UpdateUserInformationDto,
    public readonly id: string
  ) {}
}

export class UpdateUserInformationUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUserInformationInput): Promise<string> {
    const { dto, id } = input;
    const { username, phoneNumber } = dto;

    if (!username && !phoneNumber) {
      throw new BadRequestionException('Missing username and phone number ');
    }

    const existedUser = await this.userRepository.findById(id);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }

    if (phoneNumber) {
      const isNotValidPhoneNumber = !PhoneNumber.isValid(phoneNumber);
      if (isNotValidPhoneNumber) {
        throw new BadRequestionException('Phone number is not valid');
      }
      existedUser.updatePhoneNumber(phoneNumber);
    }

    if (username) {
      const isNotValidUsername = !Username.isValid(username);
      if (isNotValidUsername) {
        throw new BadRequestionException('Username is not valid');
      }
      existedUser.updateUsername(username);
    }

    await this.userRepository.update(existedUser);
    return 'Update successfully';
  }
}
