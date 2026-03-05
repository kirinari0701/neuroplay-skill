#!/usr/bin/env node
import crypto from 'node:crypto';

const [nonce, difficultyRaw] = process.argv.slice(2);
if (!nonce || !difficultyRaw) {
  console.error('Usage: node scripts/solve-proof.mjs <nonce> <difficulty>');
  process.exit(1);
}

const difficulty = Number.parseInt(difficultyRaw, 10);
if (!Number.isInteger(difficulty) || difficulty <= 0) {
  console.error('difficulty must be a positive integer');
  process.exit(1);
}

const prefix = '0'.repeat(difficulty);
let proof = 0;
while (true) {
  const value = `${nonce}:${proof}`;
  const hash = crypto.createHash('sha256').update(value).digest('hex');
  if (hash.startsWith(prefix)) {
    console.log(JSON.stringify({ proof: String(proof), hash }, null, 2));
    break;
  }
  proof += 1;
}
