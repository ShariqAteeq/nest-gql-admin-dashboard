import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProjectStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import {
  AddProjectInput,
  AssignEmployeeToProjectInput,
  ProjectInput,
  RemoveEmployeeFromProjectInput,
} from '../dto/project';
import { Project } from '../entities/project';
import { ProjectEmpHistory } from '../entities/ProjectEmpHistory';
import { EmployeeService } from './employee.service';
import { HelperService } from './helper.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private proRepo: Repository<Project>,
    @InjectRepository(ProjectEmpHistory)
    private proEmpRepo: Repository<ProjectEmpHistory>,
    private authService: AuthService,
    private empService: EmployeeService,
    private helperService: HelperService,
  ) {}

  async addProject(
    input: AddProjectInput,
    @Context() context,
  ): Promise<Project> {
    const creator = await this.authService.getUserFromContext(context);
    const project = new Project();
    const { name, desc, techs, startDate, status } = input;

    project['name'] = name;
    project['desc'] = desc;
    project['techs'] = techs;
    project['startDate'] = startDate;
    project['status'] = status;
    project['companyId'] = creator['company']['id'];
    project['logCreatedBy'] = creator;
    project['endDate'] = input?.['endDate'];
    return await this.proRepo.save(project);
  }

  async listProjects(
    input: ProjectInput,
    @Context() context,
  ): Promise<Project[]> {
    const user = await this.authService.getUserFromContext(context);
    return await this.proRepo.find({
      where: { status: input?.['status'], companyId: user['company']['id'] },
    });
  }

  async project(id: number): Promise<Project> {
    const pro = await this.proRepo.findOne({
      where: { id },
    });
    if (!pro) {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }
    return pro;
  }

  async changeProjectStatus(
    input: ProjectInput,
    @Context() context,
  ): Promise<Project> {
    const user = await this.authService.getUserFromContext(context);
    const pro = await this.proRepo.findOne({
      where: { id: input['id'] },
    });
    if (!pro) {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }
    pro['status'] = input['status'];
    if (
      pro['endDate'] === null &&
      input['status'] === ProjectStatus.COMPLETED
    ) {
      pro['endDate'] = this.helperService.getCurrentDate();
    }

    pro['logUpdatedBy'] = user;
    return await this.proRepo.save(pro);
  }

  async assignEmpToProject(
    input: AssignEmployeeToProjectInput,
    @Context() context,
  ): Promise<Boolean> {
    const user = await this.authService.getUserFromContext(context);
    const employee = await this.empService.employee(input['employeeId']);
    const project = await this.project(input['projectId']);
    const employeeExist = await this.proEmpRepo.findOne({
      where: {
        projectId: input['projectId'],
        companyId: user['company']['id'],
        employeeId: input['employeeId'],
      },
    });

    if (employeeExist) {
      throw new HttpException(
        'Employee Already Assigned!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const proEmpRelation = new ProjectEmpHistory();
    proEmpRelation['companyId'] = user['company']['id'];
    proEmpRelation['employeeId'] = input['employeeId'];
    proEmpRelation['projectId'] = input['projectId'];
    proEmpRelation['startDate'] = input['startDate'];
    proEmpRelation['endDate'] = input?.['endDate'];
    proEmpRelation['status'] = input['status'];
    proEmpRelation['logCreatedBy'] = user;
    proEmpRelation['logUpdatedBy'] = user;
    proEmpRelation['employee'] = employee;
    proEmpRelation['project'] = project;
    await this.proEmpRepo.save(proEmpRelation);
    return true;
  }

  async listProjectEmployees(
    input: ProjectInput,
  ): Promise<ProjectEmpHistory[]> {
    return await this.proEmpRepo.find({
      where: { projectId: input['id'], status: input['empStatus'] },
      relations: ['employee'],
    });
  }

  async removeEmployeeFromProject(
    input: RemoveEmployeeFromProjectInput,
  ): Promise<Boolean> {
    let employeeExist = await this.proEmpRepo.findOne({
      where: {
        projectId: input['projectId'],
        employeeId: input['employeeId'],
      },
    });

    if (!employeeExist) {
      throw new HttpException('Employee does mot exist!', HttpStatus.NOT_FOUND);
    }

    await this.proEmpRepo.delete({ id: employeeExist['id'] });

    return true;
  }
}
