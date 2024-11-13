import { Role } from '@prisma/client';
import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, role = Role.MODERATOR, ...override }: Override) => {
  return new User(
    {
      email: 'email@gmail.com',
      name: 'lucas',
      password: '123123',
      imageId: 'imageId',
      role: role as Role,
      ...override,
    },
    id,
  );
};
