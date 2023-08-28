import { UserEntity } from 'src/users/entities/user.entity';

export class SignupEntity extends UserEntity {
  constructor(partial: Partial<SignupEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
