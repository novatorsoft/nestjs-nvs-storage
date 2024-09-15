import { Field, ObjectType } from '@nestjs/graphql';

import { ApiResponseProperty } from '@nestjs/swagger';

@ObjectType()
export class UploadResponse {
  @ApiResponseProperty()
  @Field()
  fileName: string;

  @ApiResponseProperty()
  @Field()
  size: number;

  @ApiResponseProperty()
  @Field()
  path: string;

  @ApiResponseProperty()
  @Field()
  extension: string;

  @ApiResponseProperty()
  @Field()
  url: string;
}
