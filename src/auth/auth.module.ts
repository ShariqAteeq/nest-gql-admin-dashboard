import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { Company } from 'src/api/entities/company';
import { User } from 'src/api/entities/user';
import { CompanyService } from 'src/api/service/company.service';
import { HelperService } from 'src/api/service/helper.service';
import { NotificationService } from 'src/api/service/notification.service';
import { UserService } from 'src/api/service/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => ApiModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Company]),
  ],
  providers: [
    HelperService,
    UserService,
    AuthResolver,
    AuthService,
    NotificationService,
    CompanyService,
  ],
  exports: [],
})
export class AuthModule {}
