import { FileMime } from './file-mime.dto';
import { ImageExtension } from '../enum';

export class UploadArgs<FileType extends string | Buffer> {
  file: FileType;
  path?: string;
  fileName: string;
  defaultMime?: FileMime;
  maxSize?: number;
  validateFileTypes?: Array<string>;
  convertToImageExtension?: ImageExtension;
  convertToImageQuality?: number;
}
