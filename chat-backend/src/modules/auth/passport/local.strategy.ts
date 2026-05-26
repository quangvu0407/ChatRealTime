import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException(
        'Tài khoản chưa được xác thực email. Vui lòng kiểm tra email để xác nhận',
      );
    }
    return user;
  }
}
