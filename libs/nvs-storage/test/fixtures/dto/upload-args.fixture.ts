import { Faker, Mock, MockFactory } from 'mockingbird';
import { FileMime, UploadArgs } from '@lib/nvs-storage';

import { FileMimeFixture } from './mime-type.fixture';

export class UploadArgsFixture extends UploadArgs<string | Buffer> {
  private readonly base64File: string =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBAYLd9L8AAAAASUVORK5CYII=';

  file: string | Buffer;

  @Mock((faker) => faker.system.directoryPath())
  path: string;

  @Mock((faker) => faker.lorem.word())
  fileName: string;

  defaultMime?: FileMime;

  withBuffer() {
    this.file = Buffer.from(this.base64File, 'base64');
    return this;
  }

  withBase64() {
    this.file = this.base64File;
    return this;
  }

  withUrl() {
    this.file = Faker.image.imageUrl();
    return this;
  }

  withDefaultMime() {
    this.defaultMime = MockFactory(FileMimeFixture).one();
    return this;
  }

  getBufferFile() {
    return Buffer.from(this.base64File, 'base64');
  }
}
