import { Mock } from 'mockingbird';

class S3ConfigFixture {
  @Mock((faker) => faker.internet.password())
  accessKey: string;

  @Mock((faker) => faker.internet.password())
  secretKey: string;

  @Mock((faker) => faker.lorem.word())
  region: string;

  @Mock((faker) => faker.lorem.word())
  bucket: string;

  @Mock((faker) => faker.internet.url())
  endpoint: string;
}

export class S3ConfigurationFixture {
  @Mock(S3ConfigFixture)
  s3: S3ConfigFixture;
}
