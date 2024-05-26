import { expect, test } from 'vitest';
import { load_template_async } from '@src/helper';

test('ok test', () => {
    expect(true).toBe(true);
});

test('load static github resource', async () => {
    let content = await load_template_async({ input: { name: 'first_attempt' } });

    console.log(content);
});