import { Deposit } from '../../entities/deposit';
import { DepositRepository } from '../../repositories/depositRepository';

export class GetDepositByNameUseCase {
  constructor(private depositRepository: DepositRepository) {}

  async execute(name: string): Promise<Deposit | null> {
    const deposit = await this.depositRepository.findByName(name);

    return deposit;
  }
}
