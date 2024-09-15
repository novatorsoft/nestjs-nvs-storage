import { Mock } from 'mockingbird';
import { StorageProvider } from '@lib/nvs-storage';

export class ConfigurationFixture {
  @Mock((faker) => faker.internet.port())
  port: number;

  @Mock((faker) => faker.lorem.word())
  version: string;

  @Mock((faker) => faker.lorem.word())
  name: string;

  @Mock((faker) => faker.lorem.paragraph())
  description: string;

  @Mock((faker) => faker.internet.password())
  apiKey: string;

  @Mock('*')
  corsAllowedOrigins: string;

  @Mock(true)
  swaggerEnabled: boolean;

  @Mock((faker) => faker.lorem.word())
  basePath: string;

  @Mock('1mb')
  bodySizeLimit: string;

  @Mock({ enum: StorageProvider })
  storageProvider: StorageProvider;
}
