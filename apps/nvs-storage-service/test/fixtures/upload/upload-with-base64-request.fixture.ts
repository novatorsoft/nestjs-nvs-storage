import { Mock } from 'mockingbird';
import { UploadWithBase64Request } from '../../../src/upload/dto';

export class UploadWithBase64RequestFixture extends UploadWithBase64Request {
  @Mock(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBAYLd9L8AAAAASUVORK5CYII=',
  )
  file: string;

  @Mock((faker) => faker.lorem.word())
  fileName: string;

  @Mock((faker) => faker.lorem.word())
  path: string;
}
