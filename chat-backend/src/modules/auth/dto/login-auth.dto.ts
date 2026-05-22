import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'Email Không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Password tối thiểu 6 kí tự' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password phải chứa ít nhất 1 ký tự đặc biệt',
  })
  password: string;
}
