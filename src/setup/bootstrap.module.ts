import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiModule } from 'src/api/api.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseOrmModule } from './database.orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    AuthModule,
    DatabaseOrmModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            const authToken = connectionParams.authToken;
            console.log('Auht', authToken);
            // extract user information from token
            const user = { id: 1 };
            // return user info to add them to the context later
            return { user };
          },
        },
      },
      context: ({ req }) => ({ req }),
    }),
  ],
  exports: [],
  providers: [],
})
export class BootstrapModule {}
