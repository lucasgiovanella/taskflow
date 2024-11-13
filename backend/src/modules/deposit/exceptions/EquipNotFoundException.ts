import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/appException';

export class DepositNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Registro não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
