import { MinLength, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  username: string;

  @IsStrongPassword()
  @MinLength(6)
  password: string;
}
