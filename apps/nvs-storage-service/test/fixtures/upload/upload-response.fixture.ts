import { Mock } from 'mockingbird';
import { UploadResponse } from '../../../src/upload/dto';

export class UploadResponseFixture extends UploadResponse {
  @Mock((faker) => faker.system.fileName())
  fileName: string;

  @Mock((faker) => faker.datatype.number())
  size: number;

  @Mock((faker) => faker.system.filePath())
  path: string;

  @Mock((faker) => faker.system.mimeType())
  extension: string;

  @Mock((faker) => faker.internet.url())
  url: string;

  @Mock((faker) => faker.system.mimeType())
  mime: string;
}
