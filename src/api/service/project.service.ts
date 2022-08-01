import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProjectStatus } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import { AddProjectInput, ProjectInput } from '../dto/project';
import { Project } from '../entities/project';
import { HelperService } from './helper.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private proRepo: Repository<Project>,
    private authService: AuthService,
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

  // async assignEmpToProject()
}
