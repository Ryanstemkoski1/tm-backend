import { UserEntity } from 'src/users/entities/user.entity';

export class SigninEntity extends UserEntity {
  token: string;

  constructor(partial: Partial<SigninEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
