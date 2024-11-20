import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as process from 'process';
import * as paystack from 'paystack-api';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.enetity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  private paystackInstance: any;

    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {
      const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
      this.paystackInstance = paystack(paystackSecretKey);
    }

    async initializeTransaction(userId: number, transactionData: CreateTransactionDto) {

        try {
          const response = await this.paystackInstance.transaction.initialize(transactionData);

          const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }

            user.paystack_ref = response.data.reference;
            await this.userRepository.save(user);

            user.paystack_ref = response.data.reference;
            await this.userRepository.save(user);

            return {
                data: response.data,
                message: response.message,
                status: response.status,
            }


        } catch (error) {
            throw new InternalServerErrorException(`Paystack transaction initialization failed: ${error.message}`);
        }
    }


    async verifyTransaction(userId: number) {
        try {
          const user = await this.userRepository.findOne({ where: { id: userId } });
          if (!user) {
            throw new Error('User not found');
          }
    
          // If already verified
          if (user.paystack_ref === 'success') {
            return {
              message: 'Transaction has been verified',
              status: 'success',
            };
          }
    
          // Verify the transaction with Paystack API
          const response = await this.paystackInstance.transaction.verify({
            reference: user.paystack_ref,
          });
    
          if (response.data.status === 'success') {
            user.paystack_ref = 'success';
            user.amountDonated = response.data.amount;
            await this.userRepository.save(user);
    
            return {
              data: response.data,
              message: response.message,
              status: response.status,
            };
          } else {
            return {
              data: response.data,
              message: response.message,
              status: response.status,
            };
          }
        } catch (error) {
          throw new Error(`Transaction verification failed: ${error.message}`);
        }
      }

}
