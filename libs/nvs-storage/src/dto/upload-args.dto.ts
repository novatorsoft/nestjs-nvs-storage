import { FileMime } from './file-mime.dto';

export class UploadArgs<FileType> {
  file: FileType;
  path?: string;
  fileName: string;
  defaultMime?: FileMime;
}
