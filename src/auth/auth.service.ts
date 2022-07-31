import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmSignUpInput } from 'src/api/dto/user';
import { User } from 'src/api/entities/user';
import { UserStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import {
  AccessTokenOutput,
  LoginInput,
  LoginOutput,
  ResetPasswordInput,
} from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UserService } from 'src/api/service/user.service';
import { Company } from 'src/api/entities/company';
import { Context } from '@nestjs/graphql';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    private jwtService: JwtService,
    private userSerice: UserService,
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

  validateToken(token: string): boolean | string {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return error.name;
    }
  }

  async validateUser(payload: LoginInput): Promise<User> {
    const { email } = payload;
    const user = await this.userRepo.findOneBy({ email });
    const { password, ...rest } = user;
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (
      user &&
      (user['userStatus'] === UserStatus.CHANGE_PASSWORD
        ? user['tempPassword'] !== payload['password']
        : !bcrypt.compareSync(payload['password'], user['password']))
    ) {
      throw new HttpException('Incorrect Password!', HttpStatus.BAD_REQUEST);
    }

    if (user['userStatus'] === UserStatus.CHANGE_PASSWORD) {
      throw new HttpException(
        'Please reset your password!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return rest;
  }

  async createRefreshToken(userId: number): Promise<string> {
    const refreshToken = randomBytes(64).toString('hex');

    const token = await this.userSerice.storeToken(userId, refreshToken);

    return token.refreshToken;
  }

  getUserFromAccessToken(accessToken: string): AccessTokenOutput {
    const user = this.jwtService.verify(accessToken, {
      ignoreExpiration: true,
    });

    return user;
  }

  async getUserFromContext(@Context() context): Promise<User> {
    const user = this.jwtService.verify(
      context.req.headers.authorization.substring(7),
      {
        ignoreExpiration: true,
      },
    );
    return await this.userSerice.getUser(user['userId']);
  }

  async resetPassword(input: ResetPasswordInput): Promise<LoginOutput> {
    const { email, newPassword, confirmPassword } = input;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Invalid Email!', HttpStatus.BAD_REQUEST);
    }
    if (newPassword !== confirmPassword) {
      throw new HttpException(
        'Your Password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    user['tempPassword'] = null;
    user['password'] = await bcrypt.hash(newPassword, 10);
    user['userStatus'] = UserStatus.ACTIVE;

    return await this.login(await this.userRepo.save(user));
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
      refresh_token: await this.createRefreshToken(userId),
    } as LoginOutput;
  }
}
