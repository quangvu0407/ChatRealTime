import {
  Controller,
  Body,
  Get,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/Guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':UserId')
  getProfile(@Param('UserId') id: string) {
    return this.userService.findById(id);
  }
}
