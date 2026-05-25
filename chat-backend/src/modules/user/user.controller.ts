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
import { Public } from 'src/helper/customize.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('id/:UserId')
  getProfile(@Param('UserId') id: string) {
    return this.userService.findById(id);
  }
  @Public()
  @Get('alluser')
  getAllUser() {
    return this.userService.getAllUser();
  }
}
