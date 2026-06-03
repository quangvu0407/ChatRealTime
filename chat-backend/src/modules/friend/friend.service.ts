import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { User } from '../user/entities/user.entity';
import { FriendResponseDto } from './dto/friend-response.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepo: Repository<Friend>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private dataSource: DataSource,
  ) { }

  async getFriends(
    userId: string,
    favoriteOnly: boolean = false,
  ): Promise<FriendResponseDto[]> {
    const queryBuilder = this.friendRepo
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.friend', 'user')
      .where('friend.userId = :userId', { userId });

    if (favoriteOnly) {
      queryBuilder.andWhere('friend.isFavorite = true');
    }

    const friends = await queryBuilder
      .orderBy('friend.isFavorite', 'DESC')
      .addOrderBy('user.username', 'ASC')
      .getMany();

    return friends.map((friend) => ({
      id: friend.friendId,
      username: friend.friend.username,
      avatar: friend.friend.avatar,
      status: friend.friend.status,
      lastSeen: friend.friend.lastSeen,
      nickname: friend.nickname,
      isFavorite: friend.isFavorite,
      createdAt: friend.createdAt,
    }));
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const friend1 = await manager.findOne(Friend, {
        where: { userId, friendId },
      });

      if (!friend1) {
        throw new NotFoundException('Không tìm thấy quan hệ bạn bè');
      }

      await manager.delete(Friend, { userId, friendId });
      await manager.delete(Friend, { userId: friendId, friendId: userId });
    });
  }

  async updateNickname(
    userId: string,
    friendId: string,
    nickname: string | null,
  ): Promise<Friend> {
    if (nickname && nickname.length > 50) {
      throw new BadRequestException('Nickname không được vượt quá 50 ký tự');
    }

    const friend = await this.friendRepo.findOne({
      where: { userId, friendId },
    });

    if (!friend) {
      throw new NotFoundException('Không tìm thấy quan hệ bạn bè');
    }

    friend.nickname = nickname || null;
    return await this.friendRepo.save(friend);
  }

  async updateFavorite(
    userId: string,
    friendId: string,
    isFavorite: boolean,
  ): Promise<Friend> {
    const friend = await this.friendRepo.findOne({
      where: { userId, friendId },
    });

    if (!friend) {
      throw new NotFoundException('Không tìm thấy quan hệ bạn bè');
    }

    friend.isFavorite = isFavorite;
    return await this.friendRepo.save(friend);
  }
}
