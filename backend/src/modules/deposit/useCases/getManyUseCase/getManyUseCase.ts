import { Injectable } from '@nestjs/common';
import { DepositRepository } from '../../repositories/depositRepository';

interface GetManyDepositRequest {
  inUse?: boolean;
}

@Injectable()
export class GetManyDepositUseCase {
  constructor(private depositRepository: DepositRepository) {}

  async execute({ inUse }: GetManyDepositRequest) {
    const items = await this.depositRepository.findMany(inUse);

    return items;
  }
}
