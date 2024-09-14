import { Mock } from 'mockingbird';
import { UploadArgs } from '@app/owl-storage/dto';

export class UploadArgsFixture extends UploadArgs<string | Buffer> {
  private readonly base64File: string =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBAYLd9L8AAAAASUVORK5CYII=';

  file: string | Buffer;

  @Mock((faker) => faker.system.directoryPath())
  path: string;

  @Mock((faker) => faker.system.commonFileName('png'))
  fileName: string;

  withBuffer() {
    this.file = Buffer.from(this.base64File, 'base64');
    return this;
  }

  withBase64() {
    this.file = this.base64File;
    return this;
  }
}
