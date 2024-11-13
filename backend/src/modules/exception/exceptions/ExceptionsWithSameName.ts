import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionsWithSameName extends HttpException {
  constructor() {
    super('Computador já cadastrado', HttpStatus.NOT_FOUND);
  }
}
