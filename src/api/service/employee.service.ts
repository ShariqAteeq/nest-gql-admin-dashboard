import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProjectStatus, Role, UserStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import { AddEmployeeInput } from '../dto/employee';
import { Employee } from '../entities/employee';
import { ProjectEmpHistory } from '../entities/ProjectEmpHistory';
import { User } from '../entities/user';
import { HelperService } from './helper.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private empRepo: Repository<Employee>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(ProjectEmpHistory)
    private proEmpRepo: Repository<ProjectEmpHistory>,
    private helperService: HelperService,
    private auth: AuthService,
  ) {}

  async addEmployee(
    input: AddEmployeeInput,
    @Context() context,
  ): Promise<Employee> {
    const creator = await this.auth.getUserFromContext(context);
    const user = await this.userRepo.findOne({
      where: { email: input['email'] },
    });
    if (user) {
      throw new HttpException('Employee already exist', HttpStatus.NOT_FOUND);
    }
    const tempPassword = this.helperService.getTempPassword();
    const userPayload = await this.userRepo.create({
      email: input['email'],
      tempPassword,
      isEmailVerified: true,
      userStatus: UserStatus.CHANGE_PASSWORD,
      role: [Role.EMPLOYEE, input['role']],
      logCreatedBy: creator,
    });
    const createdUser = await this.userRepo.save(userPayload);
    const employee = await this.empRepo.create({
      id: createdUser['id'],
      name: input['name'],
      email: input['email'],
      designation: input['designation'],
      salary: input['salary'],
      employeeType: input['employeeType'],
      skills: input['skills'],
      joiningDate: input['joiningDate'],
      company: creator['company'],
      companyId: creator['id'],
      user: createdUser,
    });
    return await this.empRepo.save(employee);
  }

  async listEmployees(id: number): Promise<Employee[]> {
    return await this.empRepo.find({
      where: { companyId: id },
      relations: ['company'],
    });
  }

  async employee(id: number): Promise<Employee> {
    const emp = await this.empRepo.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!emp) {
      throw new HttpException('Employee not found!', HttpStatus.NOT_FOUND);
    }
    return emp;
  }

  async listEmployeeProjects(
    projectId: number,
    status: UserStatus,
  ): Promise<ProjectEmpHistory[]> {
    return await this.proEmpRepo.find({
      where: { projectId, status },
      relations: ['employee', 'project'],
    });
  }
}
