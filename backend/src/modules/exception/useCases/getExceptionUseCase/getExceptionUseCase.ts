import { Injectable } from '@nestjs/common';
import { ExceptionRepository } from '../../repositories/exceptionRepository';


@Injectable()
export class GetExceptionUseCase {
  constructor(private readonly exceptionRepository: ExceptionRepository) {}

  async execute() {
    const exception = await this.exceptionRepository.findAll();
    if (!exception) {
      throw new Error('Exception not found');
    }
    return exception;
  }
}
