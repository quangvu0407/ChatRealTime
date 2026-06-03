import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { JwtGuard } from '../auth/Guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('friend-requests')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) { }

  @Post()
  create(@Body() dto: CreateFriendRequestDto, @Request() req) {
    return this.friendRequestService.createFriendRequest(req.user.id, dto);
  }

  @Get('received')
  getReceived(@Request() req) {
    return this.friendRequestService.getReceivedRequests(req.user.id);
  }

  @Get('sent')
  getSent(@Request() req) {
    return this.friendRequestService.getSentRequests(req.user.id);
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string, @Request() req) {
    return this.friendRequestService.acceptFriendRequest(id, req.user.id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @Request() req) {
    return this.friendRequestService.rejectFriendRequest(id, req.user.id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Request() req) {
    return this.friendRequestService.cancelFriendRequest(id, req.user.id);
  }
}
