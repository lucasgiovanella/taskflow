import { Computer as ComputerRaw } from '@prisma/client';
import { Computer } from '../../../../modules/computer/entities/Computer';

export class PrismaComputerMapper {
  static toPrisma({
    id,
    computerName,
    responsible,
    local,
    macAddress,
    replace,
    pendences,
    checked,
    updatedBy,
    type,
    status,
    isDroped,
    createdAt,
    updatedAt,
  }: Computer): ComputerRaw {
    return {
      id,
      computerName,
      responsible,
      local,
      macAddress,
      replace,
      pendences,
      checked,
      updatedBy,
      type,
      status,
      isDroped,
      createdAt,
      updatedAt,
    };
  }
  static toDomain({
    id,
    computerName,
    responsible,
    local,
    type,
    macAddress,
    replace,
    pendences,
    checked,
    updatedBy,
    status,
    isDroped,
    createdAt,
  }: ComputerRaw): Computer {
    return new Computer(
      {
        computerName,
        responsible,
        local,
        type,
        macAddress,
        replace,
        pendences,
        checked,
        isDroped,
        status,
        updatedBy,
        createdAt,
      },
      id,
    );
  }
}
