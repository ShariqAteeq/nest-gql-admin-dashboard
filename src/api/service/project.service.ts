import { Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { AddProjectInput } from '../dto/project';
import { Project } from '../entities/project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private proRepo: Repository<Project>,
    private authService: AuthService,
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
}
