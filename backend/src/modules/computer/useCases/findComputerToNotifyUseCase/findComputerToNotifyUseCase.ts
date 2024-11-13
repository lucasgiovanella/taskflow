import { Injectable } from '@nestjs/common';
import { ComputerRepository } from '../../repositories/computerRepository';

@Injectable()
export class FindComputerToNotifyUseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute() {
    const computers = await this.computerRepository.findComputerToNotify();
    return computers;
  }
}
