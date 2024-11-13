import { Deposit } from '../entities/deposit';

export abstract class DepositRepository {
  abstract create(deposit: Deposit): Promise<void>;
  abstract findById(id: string): Promise<Deposit | null>;
  abstract findByName(name: string): Promise<Deposit | null>;
  abstract findMany(inUse?: boolean): Promise<Deposit[]>;
  abstract save(deposit: Deposit): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
