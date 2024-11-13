import { User } from '../../../../modules/user/entities/User';
import { Role, User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({
    createdAt,
    email,
    name,
    role,
    password,
    id,
    updatedAt,
    imageId,
  }: User): UserRaw {
    return {
      createdAt,
      updatedAt,
      email,
      name,
      password,
      role: role as Role,
      imageId,
      id,
    };
  }

  static toDomain({
    id,
    createdAt,
    updatedAt,
    email,
    name,
    role,
    password,
    imageId,
  }: UserRaw): User {
    return new User(
      {
        createdAt,
        updatedAt,
        email,
        name: name as string,
        role,
        password,
        imageId: imageId as string,
      },
      id,
    );
  }
}
