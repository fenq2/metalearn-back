import { Injectable, BadRequestException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from './hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const createUser = new this.model(createUserDto);

    // Hash Password
    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );

    return await createUser.save();
  }

  async findById(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async findByCond(cond): Promise<any> {
    return this.model.findOne(cond).exec();
  }
}
