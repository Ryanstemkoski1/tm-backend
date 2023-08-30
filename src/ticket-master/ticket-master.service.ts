import {
  Injectable,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import { TicketMaster } from './ticket-master.schema';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class TicketMasterService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(TicketMaster.name) private ticketModel: Model<TicketMaster>,
  ) {}

  @Cron('0 */30 * * * *')
  async fetchFromTicketMaster() {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get(
            `https://app.ticketmaster.com/discovery/v2/events.json?size=2&apikey=${process.env.TICKET_MASTER_KEY}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error('An error happened!');
            }),
          ),
      );

      const events = data._embedded.events;

      const queries = events.map(async (item) => {
        return this.ticketModel.updateOne(
          { eventId: item.id },
          {
            eventId: item.id,
            startTime: item.dates.start.dateTime,
            name: item.name,
            url: item.url,
            status: item.status,
          },
          { upsert: true },
        );
      });

      await Promise.all(queries);

      return { message: 'Success.' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  findOne(eventId: string): Promise<TicketMaster> {
    return this.ticketModel.findOne({ eventId });
  }

  async findAll(): Promise<TicketMaster[]> {
    return this.ticketModel.find().lean().exec();
  }
}
