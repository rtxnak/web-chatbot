import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      await this.usersRepository.exist({
        where: {
          username: createUserDto.username,
        },
      })
    ) {
      throw new BadRequestException('usuário já existente');
    }

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      return this.usersRepository.findOne({
        where: {
          id,
        },
      });
    }
    throw new NotFoundException('Usuário não encontrado');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);

      await this.usersRepository.update(id, updateUserDto);
      return { success: true };
    }
    throw new NotFoundException('Usuário não encontrado');
  }

  async remove(id: number) {
    if (
      await this.usersRepository.exist({
        where: {
          id,
        },
      })
    ) {
      await this.usersRepository.delete(id);
      return { success: true };
    }
    throw new NotFoundException('Usuário não encontrado');
  }
}
