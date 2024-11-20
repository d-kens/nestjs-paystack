import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateSubscriptionDto {
    @IsNotEmpty()
    @IsEmail()
    customer: string;

    @IsNotEmpty()
    @IsString()
    plan: string;

    @IsOptional()
    @IsString()
    start_date?: string;
}