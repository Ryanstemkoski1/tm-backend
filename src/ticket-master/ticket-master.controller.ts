import { Controller, Get } from '@nestjs/common';
import { TicketMasterService } from './ticket-master.service';

@Controller('ticket-master')
export class TicketMasterController {
  constructor(private ticketMasterService: TicketMasterService) {}

  @Get('')
  fetch() {
    return this.ticketMasterService.findAll();
  }
}
