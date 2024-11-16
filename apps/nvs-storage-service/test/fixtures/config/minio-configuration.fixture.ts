import { Mock } from 'mockingbird';

class MinioConfigFixture {
  @Mock((faker) => faker.internet.password())
  accessKey: string;

  @Mock((faker) => faker.internet.password())
  secretKey: string;

  @Mock((faker) => faker.lorem.word())
  bucket: string;

  @Mock((faker) => faker.internet.url())
  endpoint: string;
}

export class MinioConfigurationFixture {
  @Mock(MinioConfigFixture)
  minio: MinioConfigFixture;
}
