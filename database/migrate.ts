import { Pool } from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: 'postgresql://tracklight_user:tracklight_pass@127.0.0.1:5432/tracklight_db',
  ssl: false
});

async function runMigrations() {
  try {
    // Create migrations tracking table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Get all migration files
    const migrationFiles = readdirSync(join(__dirname, 'migrations'))
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      // Check if already executed
      const { rows } = await pool.query(
        'SELECT filename FROM migrations WHERE filename = $1',
        [file]
      );

      if (rows.length === 0) {
        console.log(`Running migration: ${file}`);
        
        // Read and execute migration
        const sql = readFileSync(join(__dirname, 'migrations', file), 'utf8');
        await pool.query(sql);
        
        // Mark as executed
        await pool.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [file]
        );
        
        console.log(`✅ Completed: ${file}`);
      } else {
        console.log(`⏭️  Skipped (already run): ${file}`);
      }
    }

    console.log('🎉 All migrations completed!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigrations();