
import { IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CreateTransactionDto {
  @IsEmail()
  email: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  plan?: string;
}