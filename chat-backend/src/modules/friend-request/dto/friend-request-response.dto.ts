export class UserBasicDto {
  id: string;
  username: string;
  avatar: string;
}

export class FriendRequestResponseDto {
  id: string;
  sender?: UserBasicDto;
  receiver?: UserBasicDto;
  status: string;
  createdAt: Date;
}
