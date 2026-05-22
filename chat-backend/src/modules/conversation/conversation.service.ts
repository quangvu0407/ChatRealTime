import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    const conversation = this.conversationRepo.create(createConversationDto);
    return await this.conversationRepo.save(conversation);
  }

  async findAll() {
    return await this.conversationRepo.find();
  }

  async findOne(id: string) {
    return await this.conversationRepo.findOne({
      where: { id },
    });
  }

  async update(id: string, updateConversationDto: UpdateConversationDto) {
    await this.conversationRepo.update(id, updateConversationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.conversationRepo.delete(id);
  }
}
