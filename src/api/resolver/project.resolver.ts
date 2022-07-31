import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/constant';
import { AddProjectInput } from '../dto/project';
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
}
