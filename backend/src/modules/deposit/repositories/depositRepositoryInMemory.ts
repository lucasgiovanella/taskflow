import { Deposit } from '../entities/deposit';
import { DepositRepository } from './depositRepository';

export class DepositRepositoryInMemory implements DepositRepository {
  public items: Deposit[] = [];

  async create(deposit: Deposit): Promise<void> {
    this.items.push(deposit);
  }

  async findById(id: string): Promise<Deposit | null> {
    const deposit = this.items.find((deposit) => deposit.id === id);

    if (!deposit) return null;

    return deposit;
  }

  async findByName(name: string): Promise<Deposit | null> {
    const deposit = this.items.find((deposit) => deposit.name === name);

    if (!deposit) return null;

    return deposit;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((deposit) => deposit.id !== id);
  }

  async save(deposit: Deposit): Promise<void> {
    const depositIndex = this.items.findIndex(
      (currentDeposit) => currentDeposit.id === deposit.id,
    );

    if (depositIndex >= 0) this.items[depositIndex] = deposit;
  }

  async findMany(): Promise<Deposit[]> {
    return this.items;
  }
}
