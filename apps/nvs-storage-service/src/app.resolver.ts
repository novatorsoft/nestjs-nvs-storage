import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  nvsStorageServiceRoot(): string {
    return 'NVS Storage Service';
  }
}
