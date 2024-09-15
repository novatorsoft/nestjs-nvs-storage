import { ConfigModule } from '@nestjs/config';
import { MockFactory } from 'mockingbird';
import { OwlStorageModule } from '@app/owl-storage';
import { S3ConfigFixture } from '../../../../libs/owl-storage/test/fixtures';
import { Test } from '@nestjs/testing';
import { UploadModule } from './upload.module';

describe('UploadModule', () => {
  let uploadModule: UploadModule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [],
        }),
        UploadModule,
        OwlStorageModule.forRoot(MockFactory(S3ConfigFixture).one()),
      ],
    }).compile();

    uploadModule = app.get<UploadModule>(UploadModule);
  });

  it('Should be defined', () => {
    expect(uploadModule).toBeDefined();
  });
});
