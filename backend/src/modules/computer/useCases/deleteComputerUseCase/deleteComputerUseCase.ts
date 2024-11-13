import { Injectable } from '@nestjs/common';
import { ComputerNotFoundException } from '../../exceptions/ComputerNotFoundException';
import { ComputerRepository } from '../../repositories/computerRepository';

interface DeleteComputerRequest {
  id: string;
  updatedBy: string;
}

@Injectable()
export class DeleteComputerUseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute({ id }: DeleteComputerRequest): Promise<void> {
    const computer = await this.computerRepository.findById(id);

    if (!computer) throw new ComputerNotFoundException();

    await this.computerRepository.delete(id);
  }
}
