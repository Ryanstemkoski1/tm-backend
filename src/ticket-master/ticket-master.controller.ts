import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TicketMasterService } from './ticket-master.service';
import { TicketMasterEntity } from './entities/ticket-master.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('ticket-master')
export class TicketMasterController {
  constructor(private ticketMasterService: TicketMasterService) {}

  @Get('')
  async fetch() {
    return (await this.ticketMasterService.findAll()).map(
      (item) => new TicketMasterEntity(item),
    );
  }
}
