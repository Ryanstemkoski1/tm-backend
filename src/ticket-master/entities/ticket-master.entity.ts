import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';
export class TicketMasterEntity {
  @Expose()
  get id(): string {
    return this._id.toString();
  }

  name: string;

  url: string;

  startTime: string;

  @Exclude()
  _id: Types.ObjectId;

  @Exclude()
  __v: number;

  constructor(partial: Partial<TicketMasterEntity>) {
    Object.assign(this, partial);
  }
}
