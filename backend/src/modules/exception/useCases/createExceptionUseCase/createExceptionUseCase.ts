import { Injectable } from '@nestjs/common';
import { Exception } from '../../entities/Exception';
import { ExceptionRepository } from '../../repositories/exceptionRepository';
import { ExceptionsWithSameName } from '../../exceptions/ExceptionsWithSameName';

interface CreateExceptionRequest {
  addedBy: string;
  computerName: string;
  software: string;
  notes: string;
  updatedBy: string;
}

@Injectable()
export class CreateExceptionUseCase {
  constructor(private exceptionRepository: ExceptionRepository) {}

  async execute(data: CreateExceptionRequest) {
    const exceptionAlreadyExists = await this.exceptionRepository.findByName(
      data.computerName,
    );

    if (exceptionAlreadyExists) {
      throw new ExceptionsWithSameName();
    }

    const exception = new Exception(data);

    await this.exceptionRepository.create(exception);

    return exception;
  }
}
