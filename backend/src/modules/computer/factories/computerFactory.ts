import { ComputerType } from '@prisma/client';
import { Computer } from '../entities/Computer';

export const makeComputer = ({
  id,
  computerName = 'Default Computer',
  responsible = 'Default Responsible',
  macAddress = '00:00:00:00:00:00',
  local = 'Default Local',
  replace = 'None',
  pendences = 'None',
  checked = false,
  type = ComputerType.ADD,
  updatedBy = 'System',
  status = false,
  createdAt = new Date(),
  updatedAt = new Date(),
  ...override
}: Partial<Computer>) => {
  return new Computer(
    {
      computerName,
      responsible,
      macAddress,
      local,
      replace,
      pendences,
      checked,
      type,
      updatedBy,
      status,
      createdAt,
      updatedAt,
      ...override,
    },
    id,
  );
};
