import { Exception } from '../../../../../modules/exception/entities/Exception';

export class ExceptionViewModel {
  static toHttp({
    id,
    computerName,
    addedBy,
    notes,
    software,
    updatedBy,
    createdAt,
    updatedAt,
  }: Exception) {
    return {
      id,
      computerName,
      addedBy,
      notes,
      software,
      updatedBy,
      createdAt,
      updatedAt,
    };
  }
}
