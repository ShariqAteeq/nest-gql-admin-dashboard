import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeType, Role, UserStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import { AddEmployeeInput } from '../dto/employee';
import { Employee } from '../entities/employee';
import { User } from '../entities/user';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private empRepo: Repository<Employee>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  //   async addEmployee(input: AddEmployeeInput): Promise<Employee> {
  addEmployee(): String {
    return 'Hellso';
    // const user = await this.userRepo.findOneBy({ email: input['email'] });
    // if (user) {
    //   throw new HttpException('Employee already exist', HttpStatus.NOT_FOUND);
    // }

    // const createdUser = await this.userRepo.create({
    //     email: input["email"],
    //     tempPassword: "",
    //     userStatus: UserStatus.INACTIVE,
    //     role: [Role.EMPLOYEE]
    // })

    // const employee = await this.empRepo.create({});
    // return employee;
  }
}
