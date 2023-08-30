import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dbConfig } from './config';
import { MailModule } from './mail/mail.module';
import { TicketMasterModule } from './ticket-master/ticket-master.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    MailModule,
    TicketMasterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
