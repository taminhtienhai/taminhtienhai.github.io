import { expect, test } from 'vitest';
import { parse_json_into, load_static_json_text, load_template_async } from '@src/helper';

test('ok test', () => {
    expect(true).toBe(true);
});

test('load static github resource', async () => {
    let content = await load_template_async({ input: { name: 'first_attempt' } });

    console.log(content);
    expect(content).not.null;
});

test('load static json', async() => {
    let text = load_static_json_text({ input: { name: 'blogs' } });
    let blogs = await text.then(parse_json_into);
    console.log(blogs);
    expect(blogs).length.greaterThan(0);
});