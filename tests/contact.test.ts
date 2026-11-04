import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact } from '../src/contact.ts';

test('requires a name, valid email, and a message without attempting delivery', () => {
  assert.deepEqual(validateContact({ name: '', email: 'invalid', message: '' }), {
    name: 'Please enter your name.', email: 'Please enter a valid email address.', message: 'Please enter a message.',
  });
  assert.deepEqual(validateContact({ name: '  ', email: 'a@', message: ' ' }), {
    name: 'Please enter your name.', email: 'Please enter a valid email address.', message: 'Please enter a message.',
  });
  assert.deepEqual(validateContact({ name: 'Ada', email: 'ada@example.com', message: 'Hello' }), {});
});
