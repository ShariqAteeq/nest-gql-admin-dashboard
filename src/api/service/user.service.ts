import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/user';
import { User } from '../entities/user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(payload: CreateUserInput): Promise<User> {
    const user = new User();
    user['name'] = payload['name'];
    const res = this.userRepo.save(user);
    return res;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }
}
