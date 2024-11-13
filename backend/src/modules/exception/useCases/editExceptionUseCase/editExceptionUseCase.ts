import { Injectable } from "@nestjs/common";
import { ExceptionRepository } from "../../repositories/exceptionRepository";

interface EditExceptionRequest {
  id: string;
  updatedBy: string;
  computerName?: string;
  software?: string;
  notes?: string;
}

@Injectable()
export class EditExceptionUseCase {
  constructor(private exceptionRepository: ExceptionRepository) {}

  async execute(request: EditExceptionRequest): Promise<void> {
    const exception = await this.exceptionRepository.findById(request.id);

    if (!exception) {
      throw new Error('Exception not found');
    }

    exception.updatedBy = request.updatedBy;

    if (request.computerName) {
      exception.computerName = request.computerName;
    }

    if (request.software) {
      exception.software = request.software;
    }

    if (request.notes) {
      exception.notes = request.notes;
    }

    await this.exceptionRepository.save(exception);
  }
}
