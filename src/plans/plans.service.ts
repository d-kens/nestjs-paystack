import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as process from 'process';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { GetPlansQueryDto } from './dtos/get-plans-query.dto';
import axios from 'axios';
import { UpdatePlanDto } from './dtos/update-plan.dto';

@Injectable()
export class PlansService {
    private paystackBaseUrl = 'https://api.paystack.co/plan';


    async getPlans(query: GetPlansQueryDto) {
        try {
            const { page = 1, perPage = 10, interval, amount, from, to } = query;
            const response = await axios.get(this.paystackBaseUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
                params: {
                    page,
                    perPage,
                    interval,
                    amount,
                    from,
                    to,
                },
            });

            return response;
        } catch (error) {
            throw new InternalServerErrorException(`Error fetching plans: ${error.message}`)
        }
    }

    async getPlanByCode(planCode: string) {
        try {

            const response = await axios.get(`${this.paystackBaseUrl}/${planCode}`, {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            });

            return response;

        } catch(error) {
            if (error.response?.status === 404) {
                throw new NotFoundException(`Plan with code ${planCode} not found`);
            }
            throw new InternalServerErrorException(`Error fetching plan: ${error.message}`);
        }
    }

    async createPlan(planData: CreatePlanDto) {
        try {
            const response = await axios.post(
                this.paystackBaseUrl,
                planData,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            return response;

        } catch (error) {
            throw new InternalServerErrorException(`Error creating plan: ${error.message}`)
        }
    }

    async updatePlan(planCode: string, planData: UpdatePlanDto) {
        try {
            const response = await axios.put(
                `${this.paystackBaseUrl}/${planCode}`,
                planData,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response;

        } catch (error) {
            if (error.response?.status === 404) {
                throw new NotFoundException(`Plan with code ${planCode} not found`);
            }

            throw new InternalServerErrorException(`Error updating plan: ${error.message}`);
        }

    }
}
