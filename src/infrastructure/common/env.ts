import dotenv from 'dotenv';

let result;
switch (process.env.NODE_ENV) {
  case 'local':
    result = dotenv.config();
    break;
  case 'test':
    result = dotenv.config({ path: 'test/.env-test' });
    break;
  default:
    break;
}

if (result && result.error) {
  throw result.error;
}
