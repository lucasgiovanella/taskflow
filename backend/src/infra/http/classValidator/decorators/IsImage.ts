import { applyDecorators } from '@nestjs/common';
import { IsNotEmptyCustom } from './IsNotEmptyCustom';
import { IsStringCustom } from './IsStringCustom';
import { IsUrl } from 'class-validator';

export const IsImage = applyDecorators(
  IsNotEmptyCustom(),
  IsStringCustom(),
  IsUrl(),
);
