import { FileMime } from '@lib/nvs-storage';
import { MimeType } from 'file-type';
import { Mock } from 'mockingbird';

export class FileMimeFixture extends FileMime {
  @Mock((faker) => faker.system.fileExt())
  extension: string;

  @Mock((faker) => faker.system.mimeType())
  mime: MimeType;
}
