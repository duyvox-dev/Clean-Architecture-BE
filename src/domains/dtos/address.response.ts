import { Address } from '../models';

export interface AddressResponse {
  id: string;
  street: string;
  city: string;
  country: string;
}

export const createAddressResponse = (address: Address): AddressResponse => {
  return {
    id: address.id,
    street: address.street,
    city: address.city,
    country: address.country
  };
};
