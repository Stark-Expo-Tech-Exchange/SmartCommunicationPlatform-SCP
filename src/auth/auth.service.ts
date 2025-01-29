// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) // Ensure this is correct
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

 
  async register(name: string, email: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = this.userRepository.create({ name, email, password: hashedPassword, role });
    return await this.userRepository.save(user);
  }
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) { // Use bcrypt.compare
      const payload = { email: user.email, sub: user.id };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new Error('Invalid credentials');
  }
  
}
