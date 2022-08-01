import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/constant';
import { AddProjectInput, ProjectInput } from '../dto/project';
import { Project } from '../entities/project';
import { ProjectService } from '../service/project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private proService: ProjectService) {}

  @Roles(Role.COMPANY)
  @Mutation(() => Project)
  async addProject(
    @Args('input') input: AddProjectInput,
    @Context() context,
  ): Promise<Project> {
    return await this.proService.addProject(input, context);
  }

  @Roles(Role.COMPANY, Role.ADMIN)
  @Query(() => [Project])
  async listProjects(
    @Args({ name: 'input', nullable: true }) input: ProjectInput,
    @Context() context,
  ): Promise<Project[]> {
    return await this.proService.listProjects(input, context);
  }

  @Roles(Role.COMPANY, Role.HR)
  @Query(() => Project)
  async project(@Args('id') id: number): Promise<Project> {
    return await this.proService.project(id);
  }

  @Mutation(() => Project)
  async changeProjectStatus(
    @Args('input') input: ProjectInput,
    @Context() context,
  ): Promise<Project> {
    return await this.proService.changeProjectStatus(input, context);
  }
}
