import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as process from 'process';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { GetSubscriptionsQueryDto } from './dtos/get-subscription-query.dto';

@Injectable()
export class SubscriptionsService {
    private readonly subscriptionsUrl = 'https://api.paystack.co/subscription';

    async getAllSubscriptions(query: GetSubscriptionsQueryDto) {
        try {
            const { page = 1, perPage = 10, plan, customer, from, to } = query;

            const response: AxiosResponse = await axios.get(this.subscriptionsUrl, {
                headers: {
                  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
                params: {
                  page,
                  perPage,
                  plan,
                  customer,
                  from,
                  to,
                },
            });

            return response.data;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed to create subscription');
        }
    }

    async getSubcriptionByCode(idOrCode: string) {
        try {

            const response = await axios.get(`${this.subscriptionsUrl}/${idOrCode}`, {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            });

            return response.data;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed to create subscription');
        }
    }


    async createSubscription(subscriptionData: CreateSubscriptionDto) {
        try {

            const response = await axios.post(
                this.subscriptionsUrl,
                subscriptionData,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            return response.data;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed to create subscription');
        }
    }

    


}
