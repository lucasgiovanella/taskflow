//computer not foun exception
import { HttpException, HttpStatus } from '@nestjs/common';

export class ComputerNotFoundException extends HttpException {
  constructor() {
    super('Computador não encontrado', HttpStatus.NOT_FOUND);
  }
}
