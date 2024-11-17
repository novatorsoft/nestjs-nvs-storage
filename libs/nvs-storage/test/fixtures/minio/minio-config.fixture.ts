import { MinioConfig } from '../../../src/providers/minio/minio.config';
import { Mock } from 'mockingbird';

export class MinioConfigFixture extends MinioConfig {
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
