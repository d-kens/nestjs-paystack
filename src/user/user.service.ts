import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.enetity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUserById(userId: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id: userId}});
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const { fullname, email} = userData;
        const user = this.userRepository.create({ email, fullname });
        return await this.userRepository.save(user);
    }

}
