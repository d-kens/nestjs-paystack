import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) {}

    @Post('initiate-transaction/:userId')
    async initializeTransaction( @Param('userId') userId: number, @Body(ValidationPipe) transactionDto: CreateTransactionDto) {
        try {
            const result = await this.transactionService.initializeTransaction(
                userId,
                transactionDto
            );

            return result;
        } catch (error) {
        return { error: error.message, status: 400 };
        }
    }

    @Post('verify-transaction/:userId')
    async verifyTransaction(@Param('userId') userId: number) {
      try {
        const result = await this.transactionService.verifyTransaction(userId);
        return result;
      } catch (error) {
        return { error: error.message, status: 400 };
      }
    }
}
