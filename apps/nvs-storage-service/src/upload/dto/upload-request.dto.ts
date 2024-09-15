import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UploadRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'fileName must contain only letters, numbers, underscores, and hyphens',
  })
  @Field({ nullable: true })
  fileName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/^(?!\/)[^/].*$/, { message: 'path must not start with "/"' })
  @Field({ nullable: true })
  path: string;
}
