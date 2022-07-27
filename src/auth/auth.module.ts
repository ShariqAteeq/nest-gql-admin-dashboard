import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { Company } from 'src/api/entities/company';
import { SMSToken } from 'src/api/entities/token';
import { User } from 'src/api/entities/user';
import { CompanyService } from 'src/api/service/company.service';
import { HelperService } from 'src/api/service/helper.service';
import { NotificationService } from 'src/api/service/notification.service';
import { UserService } from 'src/api/service/user.service';
import { jwtConstants } from 'src/helpers/jwtConstant';
import { GqlAuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    forwardRef(() => ApiModule),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([SMSToken]),
    passportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    HelperService,
    UserService,
    AuthResolver,
    AuthService,
    NotificationService,
    CompanyService,
    JwtStrategy,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: GqlAuthGuard,
    // },
  ],
  exports: [passportModule, AuthService, UserService],
})
export class AuthModule {}
