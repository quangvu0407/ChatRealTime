import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { VerificationCode } from './entities/verification-code.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationRepo: Repository<VerificationCode>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) { }

  async generateCode(
    userId: string,
    type: string,
    ipAddress?: string,
  ): Promise<string> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User không tồn tại');
    }

    // Rate limiting: 5 phút/lần
    if (user.lastVerificationSentAt) {
      const diff = Date.now() - user.lastVerificationSentAt.getTime();
      if (diff < 300000) {
        throw new BadRequestException('Vui lòng đợi 5 phút trước khi gửi lại');
      }
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save to Redis
    const cacheKey = `verification:${userId}:${type}`;
    await this.cacheManager.set(
      cacheKey,
      { code, expiresAt: expiresAt.getTime(), attempts: 0 },
      300, // TTL 15 minutes
    );

    // Save to Database
    await this.verificationRepo.save({
      code,
      type,
      expiresAt,
      ipAddress,
      user: { id: userId },
    });

    // Update user
    user.lastVerificationSentAt = new Date();
    await this.userRepo.save(user);

    return code;
  }

  async verifyCode(
    userId: string,
    code: string,
    type: string,
  ): Promise<boolean> {
    const cacheKey = `verification:${userId}:${type}`;

    // Check Redis first
    let cached: any = await this.cacheManager.get(cacheKey);

    if (!cached) {
      // Fallback to Database
      const dbCode = await this.verificationRepo.findOne({
        where: { user: { id: userId }, type, isUsed: false },
        order: { createdAt: 'DESC' },
      });

      if (!dbCode) {
        throw new BadRequestException('Mã xác nhận không tồn tại');
      }

      cached = {
        code: dbCode.code,
        expiresAt: dbCode.expiresAt.getTime(),
        attempts: dbCode.attempts,
      };
    }

    // Check expiration
    if (Date.now() > cached.expiresAt) {
      await this.cacheManager.del(cacheKey);
      throw new BadRequestException('Mã xác nhận đã hết hạn');
    }

    // Check attempts
    if (cached.attempts >= 5) {
      throw new BadRequestException(
        'Bạn đã nhập sai quá 5 lần. Vui lòng yêu cầu mã mới',
      );
    }

    // Verify code
    if (cached.code !== code) {
      cached.attempts += 1;
      await this.cacheManager.set(cacheKey, cached, 900);

      // Update DB
      await this.verificationRepo.update(
        { user: { id: userId }, type, isUsed: false },
        { attempts: cached.attempts },
      );

      throw new BadRequestException(
        `Mã xác nhận không đúng. Còn ${5 - cached.attempts} lần thử`,
      );
    }

    // Success - mark as used
    await this.verificationRepo.update(
      { user: { id: userId }, type, isUsed: false },
      { isUsed: true, usedAt: new Date() },
    );

    await this.cacheManager.del(cacheKey);

    // Update user verification status
    if (type === 'email_verification') {
      await this.userRepo.update(userId, { isEmailVerified: true });
    }

    return true;
  }
}
