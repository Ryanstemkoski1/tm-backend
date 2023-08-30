import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<TicketMaster>;

@Schema({ timestamps: true })
export class TicketMaster {
  @Prop({ required: true })
  eventId: string;

  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop()
  startTime: string;
}

export const TicketMasterSchema = SchemaFactory.createForClass(TicketMaster);
