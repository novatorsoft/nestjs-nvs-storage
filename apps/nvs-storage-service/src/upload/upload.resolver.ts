import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import {
  UploadResponse,
  UploadWithBase64Request,
  UploadWithUrlRequest,
} from './dto';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadResponse)
  async uploadWithBase64(
    @Args('input') uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResponse> {
    return this.uploadService.uploadWithBase64Async(uploadRequest);
  }

  @Mutation(() => UploadResponse)
  async uploadWithUrl(
    @Args('input') uploadRequest: UploadWithUrlRequest,
  ): Promise<UploadResponse> {
    return this.uploadService.uploadWithUrlAsync(uploadRequest);
  }
}
