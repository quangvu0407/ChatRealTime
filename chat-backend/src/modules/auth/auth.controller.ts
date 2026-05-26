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
import { VerificationService } from './verification.service';
import { CreateAuthDto, Code } from './dto/create-auth.dto';
import { JwtGuard } from './Guard/jwt.guard';
import { Public, ResponseMessage } from 'src/helper/customize.guard';
import { LocalGuard } from './Guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationService: VerificationService,
  ) { }

  @Post('register')
  @Public()
  async register(@Body() createAuthDto: CreateAuthDto, @Request() req) {
    const user = await this.authService.handleRegister(createAuthDto);

    if (!user || !user.id) {
      throw new BadRequestException('Đăng ký thất bại');
    }

    return {
      message:
        'Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản',
      userId: user.id,
    };
  }

  @Post('verify-email')
  @Public()
  @ResponseMessage('Verify email')
  async verifyEmail(@Body() codeDto: Code) {
    await this.verificationService.verifyCode(
      codeDto.id,
      codeDto.code,
      'email_verification',
    );

    return { message: 'Xác nhận email thành công' };
  }

  @Post('resend-code')
  @Public()
  @ResponseMessage('Resend verification code')
  async resendCode(@Body('userId') userId: string, @Request() req) {
    const code = await this.verificationService.generateCode(
      userId,
      'email_verification',
      req.ip,
    );

    // TODO: Send email with code
    console.log('New verification code:', code);

    return { message: 'Đã gửi lại mã xác nhận' };
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
