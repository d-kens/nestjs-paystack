import { Body, Controller, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { GetPlansQueryDto } from './dtos/get-plans-query.dto';
import { UpdatePlanDto } from './dtos/update-plan.dto';

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) {}

    @Get()
    getPlans(@Query() query: GetPlansQueryDto) {
        return this.plansService.getPlans(query);
    }

    @Get(':code')
    async getPlanByCode(@Param('code') planCode: string) {
        return this.plansService.getPlanByCode(planCode);
    }

    @Post()
    createPlan(@Body(ValidationPipe) createPlanDto: CreatePlanDto) {
        return this.plansService.createPlan(createPlanDto);
    }

    @Put(':code')
    updatePlan(@Param('code') planCode: string, @Body(ValidationPipe) updatePlan: UpdatePlanDto) {
        return this.plansService.updatePlan(planCode, updatePlan);
    }
}
