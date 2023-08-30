import { Exclude, Expose } from 'class-transformer';

export class TicketMasterEntity {
  @Exclude()
  id: string;

  name: string;

  url: string;

  @Expose()
  get startTime(): string {
    return this.dates.start.dateTime;
  }

  status: string;

  @Expose()
  get eventId(): string {
    return this.id;
  }

  @Exclude()
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
  };

  constructor(partial: Partial<TicketMasterEntity>) {
    Object.assign(this, partial);
  }
}
