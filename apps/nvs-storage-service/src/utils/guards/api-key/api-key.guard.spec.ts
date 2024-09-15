import { Test, TestingModule } from '@nestjs/testing';

import { ApiKeyGuard } from './api-key.guard';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';
import { Faker } from 'mockingbird';
import { GqlExecutionContext } from '@nestjs/graphql';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when apiKey is set and request header matches', () => {
    const apiKey = Faker.internet.password();
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { 'x-api-key': apiKey },
        }),
      }),
      getType: () => 'http',
    } as ExecutionContext;

    jest.spyOn(configService, 'get').mockReturnValue(apiKey);

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should return false when apiKey is set but request header does not match', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { 'x-api-key': Faker.internet.password() },
        }),
      }),
      getType: () => 'http',
    } as ExecutionContext;

    jest.spyOn(configService, 'get').mockReturnValue(Faker.internet.password());

    expect(guard.canActivate(mockContext)).toBe(false);
  });

  it('should return true when apiKey is not set', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
      getType: () => 'http',
    } as ExecutionContext;

    jest.spyOn(configService, 'get').mockReturnValue(undefined);

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should handle GraphQL context', () => {
    const apiKey = Faker.internet.password();
    const mockContext = {
      getType: () => 'graphql',
      getArguments: () => [],
      getClass: () => null,
      getHandler: () => null,
      switchToHttp: () => null,
      switchToRpc: () => null,
      switchToWs: () => null,
    } as unknown as ExecutionContext;

    const mockGqlContext = {
      getContext: jest.fn().mockReturnValue({
        req: {
          headers: { 'x-api-key': apiKey },
        },
      }),
    };

    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue(mockGqlContext as any);
    jest.spyOn(configService, 'get').mockReturnValue(apiKey);

    expect(guard.canActivate(mockContext)).toBe(true);
  });
});
