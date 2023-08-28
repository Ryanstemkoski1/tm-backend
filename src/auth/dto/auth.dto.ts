import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export class SigninDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class SignupDto extends CreateUserDto {
  @IsNotEmpty()
  readonly confirm_password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly confirm_password: string;
}
