import { Deposit } from '../entities/deposit';

type Override = Partial<Deposit>;

export const makeDeposit = (override: Override = {}) => {
  return new Deposit(
    {
      name: override.name ?? 'Default Name',
      year: override.year ?? new Date().getFullYear(),
      addedBy: override.addedBy ?? 'System Admin',
      notes: override.notes ?? '',
      inUse: override.inUse ?? false,
      createdAt: override.createdAt ?? new Date(),
      updatedAt: override.updatedAt ?? new Date(),
      model: override.model ?? 'Default Model',
      ...override,
    },
    override.id,
  );
};
