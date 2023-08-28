import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const saltOrRounds = 10;
export const IS_PUBLIC_KEY = 'isPublic';

export const jwtConstants = {
  secret: 'blist_secret',
  expireIn: '30d', //min
};

export const s3PublicBucket = 'blistmediapublic';

export const dbConfig = async (
  config: ConfigService,
): Promise<MongooseModuleFactoryOptions> =>
  config.get<string>('NODE_ENV') === 'production'
    ? {
        uri: config.get<string>('DATABASE_URI'),
        tls: true,
        replicaSet: 'rs0',
        readPreference: 'secondaryPreferred',
        retryWrites: false,
        tlsCAFile: path.resolve('./global-bundle.pem'),
      }
    : {
        uri: config.get<string>('DATABASE_URI'),
      };

export const messages = {
  signupSuccess: 'completed',
};
