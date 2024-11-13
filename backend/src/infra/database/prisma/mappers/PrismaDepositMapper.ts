import { Deposit as DepositRaw } from '@prisma/client';
import { Deposit } from '../../../../modules/deposit/entities/deposit';

export class PrismaDepositMapper {
  static toPrisma({
    id,
    name,
    year,
    addedBy,
    notes,
    inUse,
    model,
    createdAt,
    updatedAt,
  }: Deposit): DepositRaw {
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

  static toDomain({
    id,
    name,
    year,
    addedBy,
    notes,
    inUse,
    model,
    createdAt,
    updatedAt,
  }: DepositRaw): Deposit {
    return new Deposit(
      {
        name,
        year,
        addedBy,
        notes,
        inUse,
        model,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
