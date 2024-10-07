import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UploadRequest } from './upload-request.dto';

@InputType()
export class UploadWithBase64Request extends UploadRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'file is required' })
  @Matches(/^data:([A-Za-z-+/]+);base64,([A-Za-z0-9+/=]*)$/, {
    message: 'file must be a valid base64 encoded string',
  })
  @Field()
  file: string;
}
