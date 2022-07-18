import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmSignUpInput } from 'src/api/dto/user';
import { User } from 'src/api/entities/user';
import { UserStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async verifyEmail(payload: ConfirmSignUpInput): Promise<User> {
    const { email, code } = payload;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (user['isEmailVerified']) {
      throw new HttpException(
        'Your email already verified!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user['emailVerificationCode'] === code) {
      user['isEmailVerified'] = true;
      user['emailVerificationCode'] = null;
      user['userStatus'] = UserStatus.ACTIVE;
      await this.userRepo.save(user);
    } else {
      throw new HttpException('Code does not match!', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
