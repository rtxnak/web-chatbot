import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntity } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateChatDto, userInfo: UserEntity) {
    if (
      await this.usersRepository.exist({
        where: {
          id: data.userId,
        },
      })
    ) {
      data.username = userInfo.username;
      data.userId = userInfo.id;
      const chat = this.chatRepository.create(data);
      const chatCreated = await this.chatRepository.save(chat);

      return chatCreated;
    } else {
      throw new BadRequestException('Usuário não existente');
    }
  }

  async findAllById(userInfo: UserEntity) {
    const result = await this.chatRepository
      .createQueryBuilder('chat')
      .where({
        userId: userInfo.id,
      })
      .getMany();
    return result;
  }
}
