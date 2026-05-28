import { Test, TestingModule } from '@nestjs/testing';
import { ConverPaticipantService } from './conver-paticipant.service';

describe('ConverPaticipantService', () => {
  let service: ConverPaticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverPaticipantService],
    }).compile();

    service = module.get<ConverPaticipantService>(ConverPaticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
