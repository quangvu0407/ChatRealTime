import {
  Controller,
  Body,
  Get,
  UseGuards,
  Request,
  Param,
  Query,
  BadRequestException,
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

  @UseGuards(JwtGuard)
  @Get('search')
  async searchUsers(@Query('q') keyword: string, @Request() req) {
    if (!keyword || keyword.trim().length < 2) {
      throw new BadRequestException('Keyword phải có ít nhất 2 ký tự');
    }

    return this.userService.searchUsers(keyword.trim(), req.user.id);
  }
}
