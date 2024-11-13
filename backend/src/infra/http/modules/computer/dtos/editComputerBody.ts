import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditComputerBody {
  @ApiProperty({
    example: 'nome.responsável',
    description: 'quem está atualizando o computador',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @ApiProperty({
    example: 'patri-DESK',
    description: 'o nome do computador',
  })
  @IsString()
  @IsOptional()
  computerName?: string;

  @ApiProperty({
    example: 'nome.responsável',
    description: 'o responsável pelo computador',
  })
  @IsString()
  @IsOptional()
  responsible?: string;

  @ApiProperty({
    example: 'local',
    description: 'o local do computador',
  })
  @IsString()
  @IsOptional()
  local?: string;

  @ApiProperty({
    example: 'macAddress',
    description: 'o endereço MAC do computador',
  })
  @IsString()
  @IsOptional()
  macAddress?: string;

  @ApiProperty({
    example: 'replace',
    description: 'o computador que será substituído',
  })
  @IsString()
  @IsOptional()
  replace?: string;

  @ApiProperty({
    example: 'pendences',
    description: 'pendências do computador',
  })
  @IsString()
  @IsOptional()
  pendences?: string;

  @ApiProperty({
    example: 'concluido',
    description: 'se o computador foi concluído',
  })
  @IsBoolean()
  @IsOptional()
  checked?: boolean;

  @ApiProperty({
    example: 'true',
    description: 'se o computador é para baixa',
  })
  @IsBoolean()
  @IsOptional()
  isDroped?: boolean;

  @ApiProperty({
    example: 'true',
    description: 'se o computador já foi instalado no local',
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
