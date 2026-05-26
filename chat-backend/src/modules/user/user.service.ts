import {
  ConflictException,
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { hashPasswordHelper } from 'src/helper/utils';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationService } from '../auth/verification.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => VerificationService))
    private readonly verificationService: VerificationService,
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    // console.log(user);

    return {
      exists: !!user,
      isEmailVerified: user?.isEmailVerified ?? false,
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

    if (isExist.exists) {
      if (isExist.isEmailVerified) {
        throw new ConflictException(`Email ${email} đã tồn tại`);
      }
      // Update existing unverified user
      await this.userRepo.update(
        { email },
        {
          username,
          password: await hashPasswordHelper(password),
        },
      );

      // Generate verification code using VerificationService
      const code = await this.verificationService.generateCode(
        isExist.user!.id,
        'email_verification',
      );

      // Send email with verification code
      await this.mailerService.sendMail({
        to: email,
        subject: 'Đăng ký tài khoản',
        text: 'Đăng ký thành công',
        template: 'register',
        context: {
          name: username ?? email,
          activationCode: code,
          year: '2026',
        },
      });

      return {
        id: isExist.user!.id,
      };
    }

    // Create new user
    const hashPassword = await hashPasswordHelper(password);
    const user = this.userRepo.create({
      email,
      username,
      password: hashPassword,
    });
    const savedUser = await this.userRepo.save(user);

    // Generate verification code using VerificationService
    const code = await this.verificationService.generateCode(
      savedUser.id,
      'email_verification',
    );

    // Send email with verification code
    await this.mailerService.sendMail({
      to: email,
      subject: 'Đăng ký tài khoản',
      text: 'Đăng ký thành công',
      template: 'register',
      context: {
        name: username ?? email,
        activationCode: code,
        year: '2026',
      },
    });

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
      isEmailVerified: userDetail.isEmailVerified,
      createdAt: userDetail.createdAt,
    };
  };

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'username', 'avatar', 'isEmailVerified'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getAllUser() {
    return this.userRepo.find();
  }
}
