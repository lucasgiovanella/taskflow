import { Computer } from '../../../../../modules/computer/entities/Computer';

export class ComputerViewModel {
  static toHttp({
    id,
    computerName,
    responsible,
    local,
    replace,
    pendences,
    status,
    checked,
    macAddress,
    type,
    createdAt,
    updatedAt,
  }: Computer) {
    return {
      id,
      computerName,
      responsible,
      local,
      replace,
      pendences,
      status,
      type,
      checked,
      macAddress,
      createdAt,
      updatedAt,
    };
  }
}
