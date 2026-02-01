import { json } from '@sveltejs/kit';
import { Database } from 'bun:sqlite';
import { randomUUID } from 'crypto';

const db = new Database('tane.db');

export async function GET() {
  const seeds = db.query('SELECT * FROM seeds ORDER BY created_at DESC').all();
  return json(seeds);
}

export async function POST({ request }) {
  const { content } = await request.json();
  
  if (!content?.trim()) {
    return json({ error: 'Content is required' }, { status: 400 });
  }
  
  const id = randomUUID();
  
  db.run(
    'INSERT INTO seeds (id, content, status, growth_score) VALUES (?, ?, ?, ?)',
    [id, content.trim(), 'planted', 0]
  );
  
  // TODO: Queue research jobs
  
  return json({ id, content, status: 'planted' }, { status: 201 });
}
