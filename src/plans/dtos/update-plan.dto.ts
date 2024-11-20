import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdatePlanDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    amount?: number;
}