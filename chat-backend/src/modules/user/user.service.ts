import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { comparePasswordHelper, hashPasswordHelper } from 'src/helper/utils';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    // console.log(user);

    return {
      exists: !!user,
      isActive: user?.isActive ?? false,
      user,
    };
  };
  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    const { email, password, username } = registerDto;
    const isExist = await this.isEmailExist(email);
    console.log(isExist);
    if (isExist.exists) {
      if (isExist.isActive) {
        throw new BadRequestException(`Email ${email} đã tồn tại`);
      }
      await this.userRepo.update(
        { email },
        {
          username,
          password: await hashPasswordHelper(password),
        },
      );
      return {
        id: isExist.user!.id,
      };
    }

    const hashPassword = await hashPasswordHelper(password);
    const user = this.userRepo.create({
      email,
      username,
      password: hashPassword,
    });
    const savedUser = await this.userRepo.save(user);
    return {
      id: savedUser.id,
    };
  };

  getProfile = async (user: any) => {
    const userDetail = await this.findByEmail(user.email);
    if (!userDetail) {
      return null;
    }
    return {
      id: userDetail.id,
      email: userDetail.email,
      username: userDetail.username,
      avatar: userDetail.avatar,
      isActive: userDetail.isActive,
      createdAt: userDetail.createdAt,
    };
  };

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'username', 'avatar', 'isActive'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
