import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    return await this.userRepo.save(user)
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(Id: number) {
    return await this.userRepo.findOne({ where: { Id } });
  }

  async update(Id: number, updateUserDto: UpdateUserDto) {
    const update = await this.userRepo.update({ Id }, { ...updateUserDto })
  }

  async remove(Id: number) {
    return this.userRepo.delete(Id);
  }
}
