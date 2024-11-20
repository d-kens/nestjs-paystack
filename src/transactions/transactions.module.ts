import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.enetity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
