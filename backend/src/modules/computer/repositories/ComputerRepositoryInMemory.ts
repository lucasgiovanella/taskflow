import { Computer } from '../entities/Computer';
import { ComputerRepository } from './computerRepository';

export class ComputerRepositoryInMemory implements ComputerRepository {
  computers: Computer[] = [];

  async create(computer: Computer): Promise<void> {
    this.computers.push(computer);
  }

  async findById(id: string): Promise<Computer | null> {
    const computer = this.computers.find((computer) => computer.id === id);

    return computer || null;
  }

  async findMany(): Promise<Computer[]> {
    const computers = this.computers;

    return computers;
  }

  async save(computer: Computer): Promise<void> {
    const computerIndex = this.computers.findIndex(
      (item) => item.id === computer.id,
    );

    this.computers[computerIndex] = computer;
  }

  async delete(id: string): Promise<void> {
    this.computers = this.computers.filter((computer) => computer.id !== id);
  }

  async findComputerToNotify(): Promise<Computer[]> {
    const computer = this.computers.find(computer => !computer.status);
    return computer ? [computer] : [];
  }
}
