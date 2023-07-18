import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  username?: string;

  @IsString()
  chat: string;

  @IsDateString()
  createdAt?: Date;

  @IsNumber()
  userId?: number;
}
