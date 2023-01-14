import { BadRequestionException } from '../../exceptions';
import { isStringEmptyOrUndefined } from '../../utils';
import { v4 as uuid } from 'uuid';

export interface AddressProps {
  street: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  id?: string;
}

export class Address {
  public get street() {
    return this.props.street;
  }

  public get city() {
    return this.props.city;
  }

  public get country() {
    return this.props.country;
  }

  public get id() {
    return this.props.id;
  }

  public constructor(private readonly props: AddressProps) {
    const { street, city, country, id } = props;
    if (isStringEmptyOrUndefined(street)) {
      throw new BadRequestionException('Street is null/undefined');
    }

    if (isStringEmptyOrUndefined(city)) {
      throw new BadRequestionException('City is null/undefined');
    }

    if (isStringEmptyOrUndefined(country)) {
      throw new BadRequestionException('City is null/undefined');
    }
    if (!id) {
      this.props.id = uuid();
    }
  }

  public updateInformation(props: AddressProps) {
    const { street, city, country } = props;
    if (isStringEmptyOrUndefined(street)) {
      throw new BadRequestionException('Street is null/undefined');
    }

    if (isStringEmptyOrUndefined(city)) {
      throw new BadRequestionException('City is null/undefined');
    }

    if (isStringEmptyOrUndefined(country)) {
      throw new BadRequestionException('City is null/undefined');
    }

    this.props.street = street;
    this.props.city = city;
    this.props.country = country;
  }
}
