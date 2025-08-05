import type { Heading } from './types';

export interface TocNode extends Heading {
	children: TocNode[];
}

export function buildTocTree(headings: Heading[]): TocNode[] {
	const root: TocNode = { text: 'root', level: 0, children: [] };
	const stack: TocNode[] = [root];

	for (const heading of headings) {
		const node: TocNode = { ...heading, children: [] };
		while (stack.length > 1 && stack[stack.length - 1].level >= node.level) {
			stack.pop();
		}
		stack[stack.length - 1].children.push(node);
		stack.push(node);
	}

	return root.children;
}