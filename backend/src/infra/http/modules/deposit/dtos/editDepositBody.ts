import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom';

export class EditDepositBody {
  @ApiProperty({
    example: 'patrimônio',
    description: 'Nome do equipamento',
  })
  @IsOptional()
  @IsStringCustom()
  name: string;

  @ApiProperty({
    example: 2024,
    description: 'ano que o equipamento foi adquirido',
  })
  @IsNotEmptyCustom()
  @IsOptional()
  @IsNumber()
  year: number;

  @ApiProperty({
    example: 'João',
    description: 'Nome do responsável pelo equipamento',
  })
  @IsOptional()
  @IsStringCustom()
  addedBy: string;

  @ApiProperty({
    example: 'observações',
    description: 'observações sobre o equipamento',
  })
  @IsOptional()
  @IsStringCustom()
  notes?: string;

  @ApiProperty({
    example: true,
    description: 'se o equipamento está em uso',
  })
  @IsOptional()
  @IsBoolean()
  inUse?: boolean;

  @ApiProperty({
    example: 'modeloId',
    description: 'id do modelo do equipamento',
  })
  @IsOptional()
  @IsStringCustom()
  model?: string;
}
