import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpInput } from '../dto/user';
import { User } from '../entities/user';
import { HelperService } from './helper.service';
import * as bcrypt from 'bcrypt';
import { Mail, UserStatus } from 'src/helpers/constant';
import { NotificationService } from './notification.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private helperService: HelperService,
    private notifService: NotificationService,
  ) {}

  async create(payload: UserSignUpInput): Promise<User> {
    const { email, password, name, role } = payload;

    const existingUser = await this.userRepo.findOne({ where: { email } });

    if (existingUser) {
      throw new HttpException(
        'User with this email already exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const code = this.helperService.generateId(6);

    const user = new User();
    user['name'] = name;
    user['password'] = await bcrypt.hash(password, 10);
    user['email'] = email;
    user['role'] = role;
    user['userStatus'] = UserStatus.INACTIVE;
    user['isEmailVerified'] = false;
    user['emailVerificationCode'] = code;

    const mailPayload: Mail = {
      subject: 'Welcome | SMS',
      to: email,
      templateId: 'd-118c81f5353b4ce18c84c7b71ccb8291',
      templateData: {
        code,
      },
    };

    await this.notifService.sendEmailWithTemplate(mailPayload);
    return await this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }
}
