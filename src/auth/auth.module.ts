import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { User } from 'src/api/entities/user';
import { HelperService } from 'src/api/service/helper.service';
import { NotificationService } from 'src/api/service/notification.service';
import { UserService } from 'src/api/service/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => ApiModule), TypeOrmModule.forFeature([User])],
  providers: [
    HelperService,
    UserService,
    AuthResolver,
    AuthService,
    NotificationService,
  ],
  exports: [],
})
export class AuthModule {}
