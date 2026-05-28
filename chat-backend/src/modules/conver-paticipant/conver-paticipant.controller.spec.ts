import { Test, TestingModule } from '@nestjs/testing';
import { ConverPaticipantController } from './conver-paticipant.controller';
import { ConverPaticipantService } from './conver-paticipant.service';

describe('ConverPaticipantController', () => {
  let controller: ConverPaticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConverPaticipantController],
      providers: [ConverPaticipantService],
    }).compile();

    controller = module.get<ConverPaticipantController>(ConverPaticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
