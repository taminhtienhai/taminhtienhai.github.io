export type DSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type DColor = 'neutral' | 'base' | 'secondary' | 'primary' | 'error' | 'warning' | 'success' | 'info';
export type Heading = { id?: string; text: string; level: number };
export type TOC = {
    title?: string;
    headings: Heading[];
};

export type Post = {
    title: string;
    subtitle: string;
    description: string;
    link: string;
    created_date: string;
    tags: string[];
};