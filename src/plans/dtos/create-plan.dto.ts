import { IsString, IsInt, IsEnum, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  interval?: string;
}