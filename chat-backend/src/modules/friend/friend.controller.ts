import {
  Controller,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseBoolPipe,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtGuard } from '../auth/Guard/jwt.guard';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@UseGuards(JwtGuard)
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) { }

  @Get()
  getFriends(
    @Query('favorite', new ParseBoolPipe({ optional: true })) favorite: boolean,
    @Request() req,
  ) {
    return this.friendService.getFriends(req.user.id, favorite);
  }

  @Delete(':friendId')
  removeFriend(@Param('friendId') friendId: string, @Request() req) {
    return this.friendService.removeFriend(req.user.id, friendId);
  }

  @Patch(':friendId/nickname')
  updateNickname(
    @Param('friendId') friendId: string,
    @Body() dto: UpdateNicknameDto,
    @Request() req,
  ) {
    return this.friendService.updateNickname(req.user.id, friendId, dto.nickname);
  }

  @Patch(':friendId/favorite')
  updateFavorite(
    @Param('friendId') friendId: string,
    @Body() dto: UpdateFavoriteDto,
    @Request() req,
  ) {
    return this.friendService.updateFavorite(req.user.id, friendId, dto.isFavorite);
  }
}
