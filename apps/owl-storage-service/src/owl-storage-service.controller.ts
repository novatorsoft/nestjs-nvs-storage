import { Controller, Get } from '@nestjs/common';
import { OwlStorageServiceService } from './owl-storage-service.service';

@Controller()
export class OwlStorageServiceController {
  constructor(private readonly owlStorageServiceService: OwlStorageServiceService) {}

  @Get()
  getHello(): string {
    return this.owlStorageServiceService.getHello();
  }
}
