import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));

function readmeExample() {
  const readme = readFileSync(path.join(root, 'README.md'), 'utf8');
  const block = readme.match(/```js\n([\s\S]*?)```/);
  if (!block) throw new Error('README.md has no ```js block');
  const code = block[1];
  const claim = code.match(/\/\/ => (.+)$/m);
  if (!claim) throw new Error('README example has no // => <value> comment');
  return { code, expected: claim[1].trim() };
}

test('README example runs and prints the value it claims', () => {
  const { code, expected } = readmeExample();
  const result = spawnSync(process.execPath, ['--input-type=module'], {
    input: code,
    cwd: root,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `example failed:\n${result.stderr}`);
  assert.equal(result.stdout.trim(), expected);
});

test('README example uses sum', () => {
  const { code } = readmeExample();
  assert.match(code, /import \{[^}]*\bsum\b[^}]*\} from '\.\/sum\.mjs'/);
  assert.ok(code.includes('sum('), 'example should call sum(');
});
