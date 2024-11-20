import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as process from 'process';
import * as paystack from 'paystack-api';
import { CreatePlanDto } from './dtos/create-plan.dto';

@Injectable()
export class PlansService {
    private paystackInstance: any;

    constructor() {
      const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
      this.paystackInstance = paystack(paystackSecretKey);
    }

    async createPlan(planData: CreatePlanDto) {
        try {
            const { interval, name, amount } = planData
            const response = await this.paystackInstance.plan.create({
                name,
                amount,
                interval,
            });

            return response;

        } catch (error) {
            throw new InternalServerErrorException(`Error creating plan: ${error.message}`)
        }
    }

    async getPlans() {
        try {
            const response = await this.paystackInstance.plan.list();
            return response;
        } catch (error) {
            throw new InternalServerErrorException(`Error fetching plans: ${error.message}`)
        }
    }
}
