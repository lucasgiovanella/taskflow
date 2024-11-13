import { Injectable } from '@nestjs/common';
import { DepositRepository } from '../../repositories/depositRepository';
import { DepositNotFoundException } from '../../exceptions/EquipNotFoundException';

interface DeleteDepositRequest {
  id: string;
}

@Injectable()
export class DeleteDepositUseCase {
  constructor(private depositRepository: DepositRepository) {}

  async execute({ id }: DeleteDepositRequest) {
    const deposit = await this.depositRepository.findById(id);

    if (!deposit) throw new DepositNotFoundException();

    await this.depositRepository.delete(id);
  }
}
