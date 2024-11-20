import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dtos/create-plan.dto';

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) {}

    @Get()
    getPlans() {
        return this.plansService.getPlans();
    }

    @Post()
    createPlan(@Body(ValidationPipe) createPlanDto: CreatePlanDto) {
        return this.plansService.createPlan(createPlanDto);
    }

}
