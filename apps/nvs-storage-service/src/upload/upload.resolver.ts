import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { UploadResponse, UploadWithBase64Request } from './dto';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadResponse)
  async uploadWithBase64(
    @Args('input') uploadRequest: UploadWithBase64Request,
  ): Promise<UploadResponse> {
    return this.uploadService.uploadWithBase64Async(uploadRequest);
  }
}
