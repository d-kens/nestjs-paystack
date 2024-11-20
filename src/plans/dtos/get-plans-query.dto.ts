import { IsOptional, IsString, IsInt, IsDateString, Min, IsIn } from 'class-validator';

export class GetPlansQueryDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    perPage?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsString()
    @IsIn(['daily', 'weekly', 'monthly', 'annually'])  // Restricting to valid intervals
    interval?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    amount?: number;

    @IsOptional()
    @IsDateString()
    from?: string;

    @IsOptional()
    @IsDateString()
    to?: string;
}
