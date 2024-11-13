import { ComputerType } from '@prisma/client';
import { Computer } from '../entities/Computer';

export abstract class ComputerRepository {
  abstract create(computer: Computer): Promise<void>;
  abstract findById(id: string): Promise<Computer | null>;
  abstract findMany(checked: boolean, type: ComputerType): Promise<Computer[]>;
  abstract findComputerToNotify(): Promise<Computer[]>;
  abstract save(computer: Computer): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
