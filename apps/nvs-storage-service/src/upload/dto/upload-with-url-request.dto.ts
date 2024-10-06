import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UploadRequest } from './upload-request.dto';

@InputType()
export class UploadWithUrlRequest extends UploadRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'file url is required' })
  @IsUrl()
  @Field()
  fileUrl: string;
}
