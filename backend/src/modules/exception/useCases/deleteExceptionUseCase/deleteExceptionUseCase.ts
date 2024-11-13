import { Injectable } from '@nestjs/common';
import { ExceptionRepository } from '../../repositories/exceptionRepository';

interface DeleteExceptionRequest {
  id: string;
}

@Injectable()
export class DeleteExceptionUseCase {
  constructor(private exceptionRepository: ExceptionRepository) {}

  async execute(request: DeleteExceptionRequest): Promise<void> {
    const exception = await this.exceptionRepository.findById(request.id);

    if (!exception) {
      throw new Error('Exception not found');
    }

    await this.exceptionRepository.delete(request.id);
  }
}
