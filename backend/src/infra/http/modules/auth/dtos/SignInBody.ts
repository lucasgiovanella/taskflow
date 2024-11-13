import { IsEmailCustom } from '../../../classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from '../../../classValidator/decorators/MinLengthCustom';

export class SignInBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsStringCustom()
  @MinLengthCustom(6)
  password: string;
}
