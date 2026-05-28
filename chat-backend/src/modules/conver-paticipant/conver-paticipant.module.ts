import { Module } from '@nestjs/common';
import { ConverPaticipantService } from './conver-paticipant.service';
import { ConverPaticipantController } from './conver-paticipant.controller';

@Module({
  controllers: [ConverPaticipantController],
  providers: [ConverPaticipantService],
})
export class ConverPaticipantModule {}
