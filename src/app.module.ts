import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.enetity';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'paystack_nestjs',
      entities: [User],
      synchronize: true,
  }), UserModule, TransactionsModule, PlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
