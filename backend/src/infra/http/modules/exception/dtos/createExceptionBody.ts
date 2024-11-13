import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExceptionBody {
  @ApiProperty({
    example: 'patrimônio',
    description: 'Nome do equipamento',
  })
  @IsString()
  @IsNotEmpty()
  computerName: string;

  @ApiProperty({
    example: 'nome.responsavel',
    description: 'quem adicionou o equipamento',
  })
  @IsString()
  @IsNotEmpty()
  addedBy: string;

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
