import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditExceptionBody {
  @ApiProperty({
    example: 'nome.responsavel',
    description: 'Quem atualizou o equipamento',
  })
  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @ApiProperty({
    example: 'patrimonio-DESK',
    description: 'Nome do equipamento',
  })
  @IsString()
  @IsOptional()
  computerName: string;

  @ApiProperty({
    example: 'observações',
    description: 'observações sobre o equipamento',
  })
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty({
    example: 'Office',
    description: 'softwares instalados',
  })
  @IsString()
  @IsOptional()
  software: string;
}
