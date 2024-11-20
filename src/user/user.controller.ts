import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.enetity';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    async getUserById(@Param('id') userId: number): Promise<User> {
        return await this.userService.getUserById(userId);
    }

    @Post()
    async createUser(@Body(ValidationPipe) userData: CreateUserDto): Promise<User> {
        return await this.userService.createUser(userData);
    }
}



