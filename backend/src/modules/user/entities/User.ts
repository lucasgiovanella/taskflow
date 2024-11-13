import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Replace } from '../../../utils/replace';

interface UserSchema {
  email: string;
  password: string;
  name: string;
  role: Role;
  imageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserSchema;
  private _id: string;

  constructor(
    props: Replace<
      UserSchema,
      { createdAt?: Date; updatedAt?: Date; role?: Role; imageId?: string }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      role: props.role || Role.MODERATOR,
      imageId: props.imageId || '',
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get role(): Role {
    return this.props.role;
  }

  set role(role: Role) {
    this.props.role = role;
  }

  get imageId(): string {
    return this.props.imageId;
  }

  set imageId(imageId: string) {
    this.props.imageId = imageId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
