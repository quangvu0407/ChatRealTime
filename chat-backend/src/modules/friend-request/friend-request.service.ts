import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { Friend } from '../friend/entities/friend.entity';
import { User } from '../user/entities/user.entity';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { FriendRequestResponseDto } from './dto/friend-request-response.dto';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepo: Repository<FriendRequest>,
    @InjectRepository(Friend)
    private friendRepo: Repository<Friend>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private dataSource: DataSource,
  ) { }

  async createFriendRequest(
    senderId: string,
    dto: CreateFriendRequestDto,
  ): Promise<FriendRequestResponseDto> {
    const { receiverId } = dto;

    if (senderId === receiverId) {
      throw new BadRequestException('Không thể gửi lời mời cho chính mình');
    }

    const receiver = await this.userRepo.findOne({ where: { id: receiverId } });
    if (!receiver) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const existingFriend = await this.friendRepo.findOne({
      where: [
        { userId: senderId, friendId: receiverId },
        { userId: receiverId, friendId: senderId },
      ],
    });

    if (existingFriend) {
      throw new ConflictException('Hai người dùng đã là bạn bè');
    }

    const existingRequest = await this.friendRequestRepo.findOne({
      where: [
        { senderId, receiverId, status: 'pending' },
        { senderId: receiverId, receiverId: senderId, status: 'pending' },
      ],
    });

    if (existingRequest) {
      throw new ConflictException('Đã tồn tại lời mời kết bạn đang chờ xử lý');
    }

    const request = this.friendRequestRepo.create({ senderId, receiverId });
    const saved = await this.friendRequestRepo.save(request);

    const full = await this.friendRequestRepo.findOne({
      where: { id: saved.id },
      relations: ['sender', 'receiver'],
    });

    return this.mapToDto(full!);
  }

  async getReceivedRequests(userId: string): Promise<FriendRequestResponseDto[]> {
    const requests = await this.friendRequestRepo.find({
      where: { receiverId: userId, status: 'pending' },
      relations: ['sender'],
      order: { createdAt: 'DESC' },
    });

    return requests.map((r) => this.mapToDto(r));
  }

  async getSentRequests(userId: string): Promise<FriendRequestResponseDto[]> {
    const requests = await this.friendRequestRepo.find({
      where: { senderId: userId, status: 'pending' },
      relations: ['receiver'],
      order: { createdAt: 'DESC' },
    });

    return requests.map((r) => this.mapToDto(r));
  }

  async acceptFriendRequest(requestId: string, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const request = await manager.findOne(FriendRequest, {
        where: { id: requestId },
      });

      if (!request || request.receiverId !== userId) {
        throw new NotFoundException('Không tìm thấy lời mời kết bạn');
      }

      if (request.status !== 'pending') {
        throw new BadRequestException('Lời mời đã được xử lý');
      }

      request.status = 'accepted';
      await manager.save(request);

      const friend1 = manager.create(Friend, {
        userId: request.senderId,
        friendId: request.receiverId,
      });
      const friend2 = manager.create(Friend, {
        userId: request.receiverId,
        friendId: request.senderId,
      });

      await manager.save([friend1, friend2]);
    });
  }

  async rejectFriendRequest(requestId: string, userId: string): Promise<void> {
    const request = await this.friendRequestRepo.findOne({
      where: { id: requestId },
    });

    if (!request || request.receiverId !== userId) {
      throw new NotFoundException('Không tìm thấy lời mời kết bạn');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Lời mời đã được xử lý');
    }

    request.status = 'rejected';
    await this.friendRequestRepo.save(request);
  }

  async cancelFriendRequest(requestId: string, userId: string): Promise<void> {
    const request = await this.friendRequestRepo.findOne({
      where: { id: requestId },
    });

    if (!request || request.senderId !== userId) {
      throw new NotFoundException('Không tìm thấy lời mời kết bạn');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Lời mời đã được xử lý');
    }

    request.status = 'cancelled';
    await this.friendRequestRepo.save(request);
  }

  private mapToDto(request: FriendRequest): FriendRequestResponseDto {
    return {
      id: request.id,
      status: request.status,
      createdAt: request.createdAt,
      sender: request.sender
        ? {
          id: request.sender.id,
          username: request.sender.username,
          avatar: request.sender.avatar,
        }
        : undefined,
      receiver: request.receiver
        ? {
          id: request.receiver.id,
          username: request.receiver.username,
          avatar: request.receiver.avatar,
        }
        : undefined,
    };
  }
}
