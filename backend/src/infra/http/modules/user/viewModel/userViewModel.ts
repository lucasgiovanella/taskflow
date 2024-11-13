import { User } from '../../../../../modules/user/entities/User';
export class UserViewModel {
  static toHttp({ createdAt, email, id, name, role, imageId }: User) {
    return {
      id,
      email,
      name,
      role,
      imageId,
      createdAt,
    };
  }
}
