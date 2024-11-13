import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageBody {
  @ApiProperty({
    example: 'avatar.jpg',
    description: 'Avatar do usuário',
    required: true,
  })
  avatar: File;
}
