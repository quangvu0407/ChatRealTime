import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email Không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Password tối thiểu 6 kí tự' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password phải chứa ít nhất 1 ký tự đặc biệt',
  })
  password: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MinLength(6, { message: 'Tên tối thiểu 6 kí tự' })
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Username không được chứa ký tự đặc biệt',
  })
  username: string;
}

export class Code {
  @IsNotEmpty({ message: 'Code không được để trống' })
  code: string;

  @IsNotEmpty({ message: 'Id không đượ để trống' })
  id: string;
}
