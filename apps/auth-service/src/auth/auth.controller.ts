import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.validate_user')
  async validateUser(@Payload() data: { email: string; pass: string }) {
    return this.authService.validateUser(data.email, data.pass);
  }

  @MessagePattern('auth.create_user')
  async createUser(@Payload() data: { username: string; email: string; pass: string }) {
    return this.authService.createUser(data.username, data.email, data.pass);
  }
}
