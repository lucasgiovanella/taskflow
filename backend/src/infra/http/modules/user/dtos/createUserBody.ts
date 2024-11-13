import { ApiProperty } from '@nestjs/swagger';
import { IsEmailCustom } from '../../../classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom';

export class CreateUserBody {
  @ApiProperty({
    example: 'email@univates.br',
    description: 'Email do usuário',
    required: true,
  })
  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsEmailCustom()
  email: string;

  @ApiProperty({
    example: 'nome do usuário',
    description: 'Nome do usuário',
    required: true,
  })
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;
}
