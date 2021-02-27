export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'NEED TO CONFIGURED',
  SECRET: process.env.SECRET || 'r@n40mk3y',
  API_URL: process.env.API_URL || 'http://localhost:3000/api',
  TOKEN_EXPIRES: process.env.TOKEN_EXPIRES || '1d',
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || '1d',
});
