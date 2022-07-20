import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmSignUpInput } from 'src/api/dto/user';
import { User } from 'src/api/entities/user';
import { UserStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import { LoginInput, LoginOutput } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

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

  async validateUser(payload: LoginInput): Promise<User> {
    const { email } = payload;
    const user = await this.userRepo.findOneBy({ email });
    const { password, ...rest } = user;
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (user && !bcrypt.compareSync(payload['password'], user['password'])) {
      throw new HttpException('Incorrect Password!', HttpStatus.BAD_REQUEST);
    }
    return rest;
  }

  async login(userPayload: User): Promise<LoginOutput> {
    const {
      email,
      userStatus,
      role,
      id: userId,
      isEmailVerified,
    } = userPayload;

    return {
      access_token: this.jwtService.sign({
        email,
        userStatus,
        role,
        userId,
        isEmailVerified,
      }),
      refresh_token: '',
    };
  }
}
