import { ComputerType } from '@prisma/client';
import { ComputerRepository } from '../../repositories/computerRepository';
import { Injectable } from '@nestjs/common';

interface GetComputerRequest {
  checked: boolean;
  type: ComputerType;
}

@Injectable()
export class GetComputerUseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ checked, type }: GetComputerRequest) {
    const computers = await this.computerRepository.findMany(
      checked,
      type,
    );
    
    return computers;
  }
}
