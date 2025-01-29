export class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: string;
}

export class LoginDto {
    email: string;
    password: string;
}
// src/auth/dto/create-auth.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;
}

