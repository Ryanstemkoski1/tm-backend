import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketMasterService } from './ticket-master.service';
import { TicketMasterController } from './ticket-master.controller';
import { TicketMaster, TicketMasterSchema } from './ticket-master.schema';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 2,
    }),
    MongooseModule.forFeature([
      { name: TicketMaster.name, schema: TicketMasterSchema },
    ]),
  ],
  controllers: [TicketMasterController],
  providers: [TicketMasterService],
})
export class TicketMasterModule {}
