import { neon, Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { initializeDatabase } from './schema.js';

// Ensure the serverless driver uses standard WebSockets in Node.js server environments
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// Fast, stateless HTTP query client for Neon (prevents WebSocket disconnects and "Connection terminated unexpectedly")
const sql = connectionString ? neon(connectionString, { fullResults: true }) : null;

// Pool available for WebSocket clients if needed
const pool = connectionString ? new Pool({ connectionString }) : null;

let isInitialized = false;

async function ensureInitialized() {
  if (isInitialized || !connectionString || process.env.NEXT_PHASE === 'phase-production-build') return;
  isInitialized = true;
  try {
    await initializeDatabase(query);
  } catch (err) {
    console.warn('⚠️ Database schema initialization warning:', err?.message || err);
  }
}

export async function query(text, params = []) {
  if (!sql) {
    throw new Error('Database not configured');
  }
  await ensureInitialized();
  return await sql(text, params);
}

export { pool };
