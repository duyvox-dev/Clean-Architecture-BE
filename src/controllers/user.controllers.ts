import { Request, Response } from 'express';
import {
  UpdateUserInformationDto,
  AddAddressDto,
  UpdateAddressDto
} from '../domains';
import { ApiErrorMapper } from '../utils';
import {
  GetAddressUseCaseInput,
  GetUserByIdUseCaseInput,
  RemoveAddressUseCaseInput,
  UpdateAddressUseCaseInput,
  UpdateUserInformationInput,
  AddAddressUseCaseInput
} from '../usecases';
import {
  addAddressUseCase,
  getAddressesUseCase,
  getUserByIdUseCase,
  removeAddressUseCase,
  updateUserInformationUseCase,
  updateAddressUseCase
} from '../di';

export const getUserByIdHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request;
    const input = new GetUserByIdUseCaseInput(userId);
    const result = await getUserByIdUseCase.execute(input);
    return response.send({
      id: result.id,
      username: result.username,
      email: result.email,
      phoneNumber: result.phoneNumber
    });
  } catch (error) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};
export const updateUserInformationHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request;
    const dto = request.body as UpdateUserInformationDto;
    const input = new UpdateUserInformationInput(dto, userId);
    const result = await updateUserInformationUseCase.execute(input);
    return response.send({
      message: result
    });
  } catch (error) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const addAddressHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request;
    console.log('UserId ne: ', userId);
    const dto = request.body as AddAddressDto;

    const input = new AddAddressUseCaseInput(dto, userId);
    const result = await addAddressUseCase.execute(input);
    return response.send({
      message: result
    });
  } catch (error) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const updateAddressHandler = async (
  request: Request,
  response: Response
) => {
  try {
    console.log('Request Params: ', request.params);
    const { id: addressId } = request.params;
    const { userId } = request;
    const dto = request.body as UpdateAddressDto;
    const input = new UpdateAddressUseCaseInput(dto, userId, addressId);
    const result = await updateAddressUseCase.execute(input);
    return response.send({
      message: result
    });
  } catch (error) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const deleteAddressHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request;
    const { id: addressId } = request.params;

    const input = new RemoveAddressUseCaseInput(userId, addressId);
    const result = await removeAddressUseCase.execute(input);
    return response.send({
      message: result
    });
  } catch (error) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const getAddressesHandler = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request;
    const input = new GetAddressUseCaseInput(userId);
    const result = await getAddressesUseCase.execute(input);
    return response.send(result);
  } catch (error) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};
