import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/appException';

export class EquipWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Computador já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
