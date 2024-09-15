import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let result = false;
    if (!this.isApiKey()) result = true;

    const request = this.getRequest(context);

    if (request?.headers['x-api-key'] === this.configService.get('apiKey'))
      result = true;

    return result;
  }

  private isApiKey() {
    return !(
      this.configService.get('apiKey') === undefined ||
      this.configService.get('apiKey') === null
    );
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() == 'http') {
      return context.switchToHttp().getRequest();
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  }
}
