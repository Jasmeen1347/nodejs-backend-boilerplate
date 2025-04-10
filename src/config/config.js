const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    DB_NAME: Joi.string().description('database name'),
    DB_PORT: Joi.string().description('database port'),
    DB_SERVER: Joi.string(),
    DB_USER: Joi.string(),
    DB_PASS: Joi.string(),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    AWS_KEY: Joi.string().description('aws key for ses'),
    AWS_REGION: Joi.string().description('aws region identifier'),
    AWS_SECRET: Joi.string().description('aws secret key'),
    ADMIN_EMAIL_ID: Joi.string().description('admin email id'),
    GOOGLE_CLIENT_ID: Joi.string().description('google client id for login'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    DB_NAME: envVars.DB_NAME,
    DB_PORT: envVars.DB_PORT,
    DB_SERVER: envVars.DB_SERVER,
    DB_USER: envVars.DB_USER,
    DB_PASS: envVars.DB_PASS,
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    aws_ses: {
      AWS_KEY: envVars.AWS_KEY,
      AWS_REGION: envVars.AWS_REGION,
      AWS_SECRET: envVars.AWS_SECRET,
      ADMIN_EMAIL_ID: envVars.ADMIN_EMAIL_ID,
    },
    from: envVars.EMAIL_FROM,
  },
  google: {
    GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
  },
};
