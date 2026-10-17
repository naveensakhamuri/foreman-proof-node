import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));

function exampleFrom(readme) {
  const block = readme.match(/```js\r?\n([\s\S]*?)```/);
  if (!block) throw new Error('README.md has no ```js block');
  const code = block[1];
  const claim = code.match(/\/\/ => (.+)$/m);
  if (!claim) throw new Error('README example has no // => <value> comment');
  return { code, expected: claim[1].trim() };
}

function readmeExample() {
  return exampleFrom(readFileSync(path.join(root, 'README.md'), 'utf8'));
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

const crlfExample =
  "# t\r\n\r\n```js\r\nimport { sum } from './sum.mjs';\r\nconsole.log(sum([1, 2, 3])); // => 6\r\n```\r\n";

test('README example parses with CRLF line endings', () => {
  const { code, expected } = exampleFrom(crlfExample);
  assert.equal(expected, '6');
  assert.ok(code.includes('sum('));
});

test('real README parses the same with CRLF', () => {
  const lf = readFileSync(path.join(root, 'README.md'), 'utf8');
  const crlf = lf.replace(/\r?\n/g, '\r\n');
  const { expected } = exampleFrom(crlf);
  assert.equal(expected, exampleFrom(lf).expected);
  assert.ok(!expected.includes('\r'));
});

test('README example parses with LF line endings', () => {
  const { expected } = exampleFrom(crlfExample.replace(/\r\n/g, '\n'));
  assert.equal(expected, '6');
});

test('README parser reports a missing js block', () => {
  assert.throws(() => exampleFrom('# no code here\r\n'), /no ```js block/);
});

test('README parser reports a missing claim comment', () => {
  assert.throws(
    () => exampleFrom('```js\r\nconsole.log(1);\r\n```\r\n'),
    /no \/\/ => <value> comment/,
  );
});
