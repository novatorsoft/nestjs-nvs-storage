import { Mock } from 'mockingbird';
import { UploadResult } from '../../../src/dto';

export class UploadResultFixture extends UploadResult {
  @Mock((faker) => faker.system.fileName())
  fileName: string;

  @Mock((faker) => faker.datatype.number())
  size: number;

  @Mock((faker) => faker.system.filePath())
  path: string;

  @Mock((faker) => faker.system.mimeType())
  extension: string;
}
