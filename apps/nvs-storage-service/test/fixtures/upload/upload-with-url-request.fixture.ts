import { Mock } from 'mockingbird';
import { UploadWithUrlRequest } from '../../../src/upload/dto';

export class UploadWithUrlRequestFixture extends UploadWithUrlRequest {
  @Mock((faker) => faker.image.imageUrl())
  fileUrl: string;

  @Mock((faker) => faker.lorem.word())
  fileName: string;

  @Mock((faker) => faker.lorem.word())
  path: string;
}
