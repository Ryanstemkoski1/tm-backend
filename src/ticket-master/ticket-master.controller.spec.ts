import { Test, TestingModule } from '@nestjs/testing';
import { TicketMasterController } from './ticket-master.controller';

describe('TicketMasterController', () => {
  let controller: TicketMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketMasterController],
    }).compile();

    controller = module.get<TicketMasterController>(TicketMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
