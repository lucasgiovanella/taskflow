import { Exception } from '../../../../modules/exception/entities/Exception';
import { Exception as ExceptionRaw } from '@prisma/client';

export class PrismaExceptionMapper {
  static toPrisma({
    id,
    computerName,
    addedBy,
    updatedBy,
    notes,
    software,
    createdAt,
    updatedAt,
  }: Exception): ExceptionRaw {
    return {
      id,
      computerName,
      addedBy,
      updatedBy,
      notes,
      software,
      createdAt,
      updatedAt,
    };
  }
  static toDomain({
    id,
    computerName,
    addedBy,
    updatedBy,
    notes,
    software,
    createdAt,
    updatedAt,
  }: ExceptionRaw): Exception {
    return new Exception(
      {
        computerName,
        addedBy,
        updatedBy,
        notes,
        software,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
