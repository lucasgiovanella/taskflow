import { Deposit } from '../../../../../modules/deposit/entities/deposit';
export class DepositViewModel {
  static toHttp({
    id,
    name,
    year,
    addedBy,
    notes,
    inUse,
    model,
    createdAt,
    updatedAt,
  }: Deposit) {
    return {
      id,
      name,
      year,
      addedBy,
      notes,
      inUse,
      model,
      createdAt,
      updatedAt,
    };
  }
}
