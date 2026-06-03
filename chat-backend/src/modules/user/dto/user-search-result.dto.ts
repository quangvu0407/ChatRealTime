export class UserSearchResultDto {
  id: string;
  username: string;
  email: string;
  avatar: string;
  relationshipStatus: 'none' | 'friend' | 'pending_sent' | 'pending_received';
}
