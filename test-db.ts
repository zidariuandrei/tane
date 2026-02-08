import { Database } from 'bun:sqlite';

console.log('Bun sqlite loaded successfully');
const db = new Database(':memory:');
console.log('Database created');
