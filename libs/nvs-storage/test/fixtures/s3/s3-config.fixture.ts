import { Mock } from 'mockingbird';
import { S3Config } from '../../../src/providers/s3/s3.config';

export class S3ConfigFixture extends S3Config {
  @Mock((faker) => faker.internet.url())
  endpoint: string;

  @Mock((faker) => faker.internet.password())
  accessKey: string;

  @Mock((faker) => faker.internet.password())
  secretKey: string;

  @Mock((faker) => faker.lorem.word())
  region: string;

  @Mock((faker) => faker.lorem.word())
  bucket: string;

  @Mock((faker) => faker.datatype.boolean())
  isGlobal: boolean;
}
