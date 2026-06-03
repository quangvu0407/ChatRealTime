import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNicknameDto {
  @IsOptional()
  @IsString({ message: 'Nickname phải là chuỗi' })
  @MaxLength(50, { message: 'Nickname không được vượt quá 50 ký tự' })
  nickname: string | null;
}
