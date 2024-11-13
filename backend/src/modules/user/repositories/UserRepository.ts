import { User } from '../entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
  abstract updateAvatar(id: string, imageId: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
