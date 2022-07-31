import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpInput } from '../dto/user';
import { User } from '../entities/user';
import { HelperService } from './helper.service';
import * as bcrypt from 'bcrypt';
import { Mail, UserStatus } from 'src/helpers/constant';
// import { NotificationService } from './notification.service';
import { Company } from '../entities/company';
import { SMSToken } from '../entities/token';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(SMSToken) private SMSTokenRepo: Repository<SMSToken>,
    private helperService: HelperService, // private notifService: NotificationService,
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
    user['password'] = await bcrypt.hash(password, 10);
    user['email'] = email;
    user['role'] = role;
    user['userStatus'] = UserStatus.INACTIVE;
    user['isEmailVerified'] = false;
    user['emailVerificationCode'] = code;
    const createdUser = await this.userRepo.save(user);

    // const mailPayload: Mail = {
    //   subject: 'Welcome | SMS',
    //   to: email,
    //   templateId: 'd-118c81f5353b4ce18c84c7b71ccb8291',
    //   templateData: {
    //     code,
    //   },
    // };

    // await this.notifService.sendEmailWithTemplate(mailPayload);
    const company = new Company();
    company['id'] = createdUser['id'];
    company['email'] = email;
    company['name'] = name;
    company['user'] = createdUser;
    await this.companyRepo.save(company);
    return createdUser;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['company', 'employee', 'employee.company'],
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async storeToken(userId: number, refreshToken: string): Promise<SMSToken> {
    const token = this.SMSTokenRepo.create({
      userId,
      refreshToken,
      expiresAt: moment().add(5, 'days').toDate(),
    });
    return await this.SMSTokenRepo.save(token);
  }
}
