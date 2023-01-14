import {
  SignInUseCase,
  SignUpUseCase,
  GetUserByIdUseCase,
  UpdateUserInformationUseCase,
  AddAddressUseCase,
  UpdateAddressUseCase,
  RemoveAddressUseCase
} from '../usecases';
import { userRepository } from './init-repositories';
import { GetAddressesUseCase } from '../usecases/get-addresses.usecase';

export const signInUseCase = new SignInUseCase(userRepository);
export const signUpUseCase = new SignUpUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const getAddressesUseCase = new GetAddressesUseCase(userRepository);
export const addAddressUseCase = new AddAddressUseCase(userRepository);
export const updateAddressUseCase = new UpdateAddressUseCase(userRepository);
export const removeAddressUseCase = new RemoveAddressUseCase(userRepository);
export const updateUserInformationUseCase = new UpdateUserInformationUseCase(
  userRepository
);
