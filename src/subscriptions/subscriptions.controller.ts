import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { GetSubscriptionsQueryDto } from './dtos/get-subscription-query.dto';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionService: SubscriptionsService) {}

    @Get()
    getSubscriptions(@Query() query: GetSubscriptionsQueryDto) {
        return this.subscriptionService.getAllSubscriptions(query);
    }

    @Get(':idOrCode')
    async fetchSubscription(@Param('idOrCode') idOrCode: string) {
        return await this.subscriptionService.getSubcriptionByCode(idOrCode);
    }

    @Post()
    async createSubscription( @Body(ValidationPipe) subscriptionData: CreateSubscriptionDto ) {
        return await this.subscriptionService.createSubscription(subscriptionData);
    }
}

