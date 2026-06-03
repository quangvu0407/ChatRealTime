export class FriendResponseDto {
  id: string;
  username: string;
  avatar: string;
  status: string;
  lastSeen: Date;
  nickname: string | null;
  isFavorite: boolean;
  createdAt: Date;
}
