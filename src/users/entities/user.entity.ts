import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class UserEntity {
  @Expose()
  get id(): string {
    return this._id.toString();
  }

  email: string;

  @Exclude()
  password: string;

  @Exclude()
  _id: Types.ObjectId;

  @Exclude()
  __v: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
