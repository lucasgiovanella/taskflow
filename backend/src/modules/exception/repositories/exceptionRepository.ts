import { Exception } from "../entities/Exception";

export abstract class ExceptionRepository {
  abstract create(exception: Exception): Promise<void>;
  abstract save(exception: Exception): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Exception | null>;
  abstract findByName(name: string): Promise<Exception | null>;
  abstract findAll(): Promise<Exception[]>;
}