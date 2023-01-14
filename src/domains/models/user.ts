import { BadRequestionException, NotFoundException } from '../../exceptions';
import { isStringEmptyOrUndefined } from '../../utils';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { Address } from './address';

export interface UserProps {
  email: string | null | undefined;
  password: string | null | undefined;
  username: string | null | undefined;
  id?: string;
  phoneNumber?: string;
  addresses?: Address[];
}
export class User {
  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get username() {
    return this.props.username;
  }

  public get phoneNumber() {
    return this.props.phoneNumber;
  }

  public get id() {
    return this.props.id;
  }

  public get addresses() {
    return this.props.addresses;
  }

  constructor(private readonly props: UserProps) {
    if (!props)
      throw new BadRequestionException('Props of user is null/undefined');

    const { email, password, username, phoneNumber, id, addresses } = props;
    if (isStringEmptyOrUndefined(email)) {
      throw new BadRequestionException('Email is null/undefined');
    }

    if (isStringEmptyOrUndefined(password)) {
      throw new BadRequestionException('Password is null/undefined');
    }
    if (isStringEmptyOrUndefined(username)) {
      throw new BadRequestionException('Username is null/undefined');
    }
    if (!phoneNumber) {
      this.props.phoneNumber = '';
    }
    if (!id) {
      this.props.id = uuid();
    }
    if (!addresses) {
      this.props.addresses = [];
    }
  }

  public updateUsername(username: string): void {
    if (isStringEmptyOrUndefined(username)) {
      throw new BadRequestionException('Username is not null/undefined');
    }
    this.props.username = username;
  }

  public updatePhoneNumber(phoneNumber: string): void {
    if (isStringEmptyOrUndefined(phoneNumber)) {
      throw new BadRequestionException('Username is not null/undefined');
    }
    this.props.phoneNumber = phoneNumber;
  }

  public hasMatchingPassword(enteredPassword: string): boolean {
    return this.password === enteredPassword;
  }

  public createAccessToken(secretKey: string, expiresIn: string): string {
    return jwt.sign(
      {
        id: this.id
      },
      secretKey,
      {
        expiresIn
      }
    );
  }
  public createIdToken(secretKey: string, expiresIn: string): string {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
        phoneNumber: this.phoneNumber
      },
      secretKey,
      {
        expiresIn
      }
    );
  }

  public addAddress(address: Address | null | undefined): void {
    if (!address) {
      throw new BadRequestionException('Address is null/undefined');
    }
    const isExistedAddress = this.props.addresses.find(
      (a) => a.id === address.id
    );
    if (isExistedAddress) {
      throw new BadRequestionException('Id of Address is existed');
    }
    this.props.addresses.push(address);
  }

  public updateAddress(address: Address | null | undefined): void {
    if (!address) {
      throw new BadRequestionException('Address is null/undefined');
    }

    const isNotExistedAddress = !this.props.addresses.find(
      (a) => a.id === address.id
    );
    if (isNotExistedAddress) {
      throw new NotFoundException('The address is not existed');
    }

    this.props.addresses.forEach((a) => {
      if (a.id === address.id) {
        a = new Address({
          street: address.street,
          city: address.city,
          country: address.country
        });
      }
    });
  }

  public removeAddress(id: string): void {
    if (isStringEmptyOrUndefined(id)) {
      throw new BadRequestionException('Address is null/undefined');
    }

    const isNotExistedAddress = !this.props.addresses.find((a) => a.id === id);
    if (isNotExistedAddress) {
      throw new NotFoundException('The address is not existed');
    }

    this.props.addresses = this.props.addresses.filter((a) => a.id !== id);
  }
}
