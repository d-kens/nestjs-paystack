import { IsString, IsInt, IsEnum, IsNotEmpty, Min } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  interval: string;

  @IsInt()
  @Min(1)
  amount: number;
}