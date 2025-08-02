import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enums';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() user: CreateUserDto) {
    const response = await this.authService.register(user);
    return response;
  }
  @Post('login')
  async login(@Body() user: CreateUserDto) {
    const response = await this.authService.login(user);
    return response;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('change-role')
  async changeRole(@User() user: any, @Body() body: { roles: Role[] }) {
    const { roles } = body;
    if (!user || !user.roles) {
      return {
        message: 'Unauthorized',
        status: 401,
      };
    }
    const response = await this.authService.changeRole(user.id, roles);
    return response;
  }
}
