import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom';

export class CreateDepositBody {
  @ApiProperty({
    example: 'patrimônio',
    description: 'Nome do equipamento',
  })
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @ApiProperty({
    example: 2024,
    description: 'ano que o equipamento foi adquirido',
  })
  @IsNumber()
  @IsOptional()
  year: number;

  @ApiProperty({
    example: 'nome.responsavel',
    description: 'quem adicionou o equipamento',
  })
  @IsNotEmptyCustom()
  @IsStringCustom()
  addedBy: string;

  @ApiProperty({
    example: 'observações',
    description: 'observações sobre o equipamento',
  })
  @IsOptional()
  @IsStringCustom()
  notes: string;

  @ApiProperty({
    example: true,
    description: 'se o equipamento está em uso',
  })
  @IsOptional()
  @IsBoolean()
  inUse: boolean;

  @ApiProperty({
    example: 'modeloId',
    description: 'id do modelo do equipamento',
  })
  @IsOptional()
  @IsStringCustom()
  model: string;
}
