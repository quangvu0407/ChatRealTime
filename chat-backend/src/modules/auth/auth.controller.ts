import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtGuard } from './Guard/jwt.guard';
import { Public, ResponseMessage } from 'src/helper/customize.guard';
import { LocalGuard } from './Guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @Public()
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.handleRegister(createAuthDto);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalGuard)
  @ResponseMessage('Login')
  handleLogin(@Request() req) {
    if (!req.user) {
      throw new BadRequestException('Error');
    }
    return this.authService.handleLogin(req.user);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @ResponseMessage('Get profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
