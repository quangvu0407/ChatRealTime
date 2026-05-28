import { Injectable } from '@nestjs/common';
import { CreateConverPaticipantDto } from './dto/create-conver-paticipant.dto';
import { UpdateConverPaticipantDto } from './dto/update-conver-paticipant.dto';

@Injectable()
export class ConverPaticipantService {
  create(createConverPaticipantDto: CreateConverPaticipantDto) {
    return 'This action adds a new converPaticipant';
  }

  findAll() {
    return `This action returns all converPaticipant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} converPaticipant`;
  }

  update(id: number, updateConverPaticipantDto: UpdateConverPaticipantDto) {
    return `This action updates a #${id} converPaticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} converPaticipant`;
  }
}
