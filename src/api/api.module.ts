import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from './entities/comment';
import { Company } from './entities/company';
import { Employee } from './entities/employee';
import { Expense } from './entities/expense';
import { Project } from './entities/project';
import { ProjectEmpHistory } from './entities/ProjectEmpHistory';
import { SMSToken } from './entities/token';
import { User } from './entities/user';
import { CommentResolver } from './resolver/comment.resolver';
import { CompanyResolver } from './resolver/company.resolver';
import { EmployeeResolver } from './resolver/employee.resolver';
import { ExpenseResolver } from './resolver/expense.resolver';
import { ProjectResolver } from './resolver/project.resolver';
import { UserResolver } from './resolver/user.resolver';
import { CompanyService } from './service/company.service';
import { EmployeeService } from './service/employee.service';
import { ExpenseService } from './service/expense.service';
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
    TypeOrmModule.forFeature([Expense]),
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [
    UserResolver,
    UserService,
    ExpenseService,
    ProjectService,
    EmployeeResolver,
    HelperService,
    EmployeeService,
    NotificationService,
    CompanyService,
    CompanyResolver,
    ExpenseResolver,
    ProjectResolver,
    CommentResolver,
  ],
  exports: [],
})
export class ApiModule {}
