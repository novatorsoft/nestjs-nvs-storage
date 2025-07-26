import { FileMime } from './file-mime.dto';
import { MimeType } from 'file-type';

export class UploadArgs<FileType extends string | Buffer> {
  file: FileType;
  path?: string;
  fileName: string;
  defaultMime?: FileMime;
  maxSize?: number;
  validateFileTypes?: Array<MimeType>;
}
