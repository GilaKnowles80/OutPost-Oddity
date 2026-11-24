import { neon } from '@neondatabase/serverless';

let sql = null;

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL);
} else {
  console.warn('DATABASE_URL not configured - database features disabled');
}

export { sql };