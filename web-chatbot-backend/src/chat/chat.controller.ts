import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserInfo } from '../decorators/user-info.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(
    @Body() createChatDto: CreateChatDto,
    @UserInfo() userInfo: UserEntity,
  ) {
    return this.chatService.create(createChatDto, userInfo);
  }

  @Get()
  findOne(@UserInfo() userInfo: UserEntity) {
    return this.chatService.findAllById(userInfo);
  }
}
