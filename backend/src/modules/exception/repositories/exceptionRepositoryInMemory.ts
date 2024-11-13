import { Exception } from '../entities/Exception';
import { ExceptionRepository } from './exceptionRepository';

export class ExceptionRepositoryInMemory implements ExceptionRepository {
  public exceptions: Exception[] = [];

  async create(exception: Exception) {
    this.exceptions.push(exception);
  }

  async save(exception: Exception) {
    const index = this.exceptions.findIndex((e) => e.id === exception.id);
    if (index !== -1) {
      this.exceptions[index] = exception;
    }
  }

  async delete(id: string) {
    const index = this.exceptions.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.exceptions.splice(index, 1);
    }
  }

  async findById(id: string) {
    return this.exceptions.find((e) => e.id === id) || null;
  }

  async findAll() {
    return this.exceptions;
  }

  async findByName(name: string) {
    return this.exceptions.find((e) => e.computerName === name) || null;
  }
}
