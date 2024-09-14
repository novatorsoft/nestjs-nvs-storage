import { description, name, version } from '../../../../package.json';

export default () => ({
  port: process.env.PORT || 3000,
  version,
  name,
  description,
  apiKey: process.env.API_KEY,
  corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS || '*',
  swaggerEnabled: process.env.SWAGGER_ENABLED,
  basePath: process.env.BASE_PATH || '/',
  bodySizeLimit: process.env.BODY_SIZE_LIMIT || '1mb',
});
