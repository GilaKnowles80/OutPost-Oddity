import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { initializeDatabase } from './schema';

// Ensure the serverless driver uses standard WebSockets in Node.js server environments
neonConfig.webSocketConstructor = ws;

let pool: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // Initialize extended database schema on module load
  initializeDatabase(pool).catch((err) => {
    console.error('⚠️ Database schema initialization warning:', err);
  });
} else {
  console.warn('DATABASE_URL not configured - database features disabled');
}

export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database not configured');
  }
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
