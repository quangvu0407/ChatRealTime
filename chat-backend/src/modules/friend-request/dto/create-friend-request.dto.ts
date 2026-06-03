import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFriendRequestDto {
  @IsNotEmpty({ message: 'receiverId không được để trống' })
  @IsUUID('4', { message: 'receiverId phải là UUID hợp lệ' })
  receiverId: string;
}
