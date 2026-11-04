import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir, devNull } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('cloning with CRLF conversion preserves exact reference CSS and SVG bytes', () => {
  const root = mkdtempSync(join(tmpdir(), 'folio-checkout-test-'));
  const source = join(root, 'source');
  const clone = join(root, 'clone');
  const template = join(root, 'empty-template');
  mkdirSync(source); mkdirSync(template);
  const env: NodeJS.ProcessEnv = {
    PATH: process.env.PATH, SystemRoot: process.env.SystemRoot,
    HOME: root, USERPROFILE: root, XDG_CONFIG_HOME: root, TMPDIR: root, TEMP: root,
    GIT_CONFIG_GLOBAL: devNull, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_COUNT: '0',
    GIT_TEMPLATE_DIR: template, GIT_TERMINAL_PROMPT: '0',
  };
  const git = (args: string[], cwd = source) => {
    const result = spawnSync('git', args, { cwd, env, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || String(result.error));
  };
  const fixtures = new Map([
    ['public/assets/reference.css', Buffer.from('body { color: black; }\n')],
    ['public/media/reference.svg', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>\n')],
  ]);
  try {
    git(['init', '--quiet']);
    git(['symbolic-ref', 'HEAD', 'refs/heads/main']);
    writeFileSync(join(source, '.gitattributes'), readFileSync(resolve(import.meta.dirname, '../.gitattributes')));
    for (const [name, bytes] of fixtures) {
      mkdirSync(dirname(join(source, name)), { recursive: true });
      writeFileSync(join(source, name), bytes);
    }
    git(['add', '.']);
    git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', '-c', 'commit.gpgsign=false',
      'commit', '--quiet', '-m', 'test: create reference checkout fixture']);
    git(['clone', '--quiet', '--no-hardlinks', '--config', 'core.autocrlf=true', source, clone]);
    for (const [name, bytes] of fixtures) assert.deepEqual(readFileSync(join(clone, name)), bytes, name);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
