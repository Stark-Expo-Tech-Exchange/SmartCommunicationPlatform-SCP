// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [UserModule], // Ensure UserModule is included here
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
