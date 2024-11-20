import { IsString, IsInt } from 'class-validator';

export class PlanResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsInt()
  amount: number;

  @IsString()
  interval: string;
}