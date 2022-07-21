import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Company } from './entities/company';
import { SMSToken } from './entities/token';
import { User } from './entities/user';
import { CompanyResolver } from './resolver/company.resolver';
import { UserResolver } from './resolver/user.resolver';
import { CompanyService } from './service/company.service';
import { HelperService } from './service/helper.service';
import { NotificationService } from './service/notification.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([SMSToken]),
  ],
  providers: [
    UserResolver,
    UserService,
    HelperService,
    NotificationService,
    CompanyService,
    CompanyResolver,
  ],
  exports: [],
})
export class ApiModule {}
