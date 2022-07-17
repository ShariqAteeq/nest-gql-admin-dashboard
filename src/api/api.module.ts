import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user';
import { UserResolver } from './resolver/user.resolver';
import { HelperService } from './service/helper.service';
import { NotificationService } from './service/notification.service';
import { UserService } from './service/user.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, HelperService, NotificationService],
  exports: [],
})
export class ApiModule {}
