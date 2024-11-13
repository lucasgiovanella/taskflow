import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class EditUSerBody {
  @ApiProperty({
    example: 'nome do usuário',
    description: 'Nome do usuário',
  })
  @IsString()
  @IsOptional()
  name: string;
  
  @ApiProperty({
    example: 'senha',
    description: 'Senha do usuário',
    required: true,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Função do usuário',
    default: 'MODERATOR',
  })
  @IsString()
  @IsOptional()
  role: Role;

  @ApiProperty({
    example: 'id da imagem',
    description: 'Id da imagem do usuário',
  })
  @IsString()
  @IsOptional()
  imageId: string;
}
