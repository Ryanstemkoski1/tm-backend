import { Test, TestingModule } from '@nestjs/testing';
import { TicketMasterService } from './ticket-master.service';

describe('TicketMasterService', () => {
  let service: TicketMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketMasterService],
    }).compile();

    service = module.get<TicketMasterService>(TicketMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
