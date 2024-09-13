import { Injectable } from '@nestjs/common';

@Injectable()
export class OwlStorageServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
