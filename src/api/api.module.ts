import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Company } from './entities/company';
import { Employee } from './entities/employee';
import { Project } from './entities/project';
import { ProjectEmpHistory } from './entities/ProjectEmpHistory';
import { SMSToken } from './entities/token';
import { User } from './entities/user';
import { CompanyResolver } from './resolver/company.resolver';
import { EmployeeResolver } from './resolver/employee.resolver';
import { ProjectResolver } from './resolver/project.resolver';
import { UserResolver } from './resolver/user.resolver';
import { CompanyService } from './service/company.service';
import { EmployeeService } from './service/employee.service';
import { HelperService } from './service/helper.service';
import { NotificationService } from './service/notification.service';
import { ProjectService } from './service/project.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([SMSToken]),
    TypeOrmModule.forFeature([ProjectEmpHistory]),
  ],
  providers: [
    UserResolver,
    UserService,
    ProjectService,
    EmployeeResolver,
    HelperService,
    EmployeeService,
    NotificationService,
    CompanyService,
    CompanyResolver,
    ProjectResolver,
  ],
  exports: [],
})
export class ApiModule {}
