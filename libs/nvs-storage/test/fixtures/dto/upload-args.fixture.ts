import { Faker, Mock } from 'mockingbird';

import { UploadArgs } from '@lib/nvs-storage';

export class UploadArgsFixture extends UploadArgs<string | Buffer> {
  private readonly base64File: string =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBAYLd9L8AAAAASUVORK5CYII=';

  file: string | Buffer;

  @Mock((faker) => faker.system.directoryPath())
  path: string;

  @Mock((faker) => faker.lorem.word())
  fileName: string;

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

  getBufferFile() {
    return Buffer.from(this.base64File, 'base64');
  }
}
