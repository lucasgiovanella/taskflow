import { ApiProperty } from '@nestjs/swagger';
import { ComputerType } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateComputerBody {
  @ApiProperty({
    example: 'patri-DESK',
    description: 'o nome do computador',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  computerName: string;

  @ApiProperty({
    example: 'ADD',
    description: 'o tipo do computador(instalação ou remoção)',
    required: true,
  })
  @IsOptional()
  type: ComputerType;

  @ApiProperty({
    example: 'nome.responsável',
    description: 'o responsável pelo computador',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  responsible: string;

  @ApiProperty({
    example: 'local',
    description: 'o local do computador',
  })
  @IsString()
  @IsOptional()
  local: string;

  @ApiProperty({
    example: 'macAddress',
    description: 'o endereço MAC do computador',
  })
  @IsString()
  @IsOptional()
  macAddress: string;

  @ApiProperty({
    example: 'replace',
    description: 'o computador que será substituído',
  })
  @IsString()
  @IsOptional()
  replace: string;

  @ApiProperty({
    example: 'true',
    description: "se o computador é para baixa",
  })
  @IsBoolean()
  @IsOptional()
  isDroped: boolean;

}
