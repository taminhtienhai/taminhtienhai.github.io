# Project: taminhtienhai.github.io

SvelteKit 2 + Svelte 5 personal blog/portfolio with a custom Markdown processing pipeline, Tailwind CSS v4, and DaisyUI v5.

## Core Stack
- **Framework:** SvelteKit 2 (Svelte 5 Runes, Snippets, Attachments)
- **Styling:** Tailwind CSS v4, DaisyUI v5, `tailwindcss-motion`, `tailwind-scrollbar`
- **Build Tooling:** Vite 6/8, Bun
- **Utilities:** `runed`, `change-case`, `tailwind-merge`

## Markdown Pipeline (`buildsrc` Workspace)
The project uses a custom pipeline to process `.svx` files in `src/lib/blogposts/`:
- **Preprocessor:** `markdownSvelte` converts `.svx` (Markdown + YAML frontmatter) into Svelte 5 components using `marked` and `shiki`.
- **Vite Plugin:** `blogPlugin` extracts metadata and TOCs from `.svx` files and generates JSON indexes in `static/meta/`, `static/tocs/`, and `static/attrs/`.
- **Templates:** Uses `./buildsrc/template/post.temp.svelte` for consistent post layout.

## Project Structure
- `src/lib/blogposts/`: Source `.svx` blog posts (Markdown format).
- `src/lib/widget/`: Svelte 5 UI components (runes-based).
- `buildsrc/`: Workspace containing the Markdown parser and build plugins.
- `static/`: Output directory for generated metadata and TOC JSONs.
- `assets/`: Static assets (images, favicon). `assets/posts/` contains mirrored `.md` files.
- `scripts/`: Build orchestration scripts.

## Key Commands
- `bun dev`: Starts the development server.
- `bun build`: Full production build (prebuild + vite build).
- `bun prebuild`: Cleans `static/` and builds the `buildsrc` workspace.
- `bun lint`: Runs OXLint for rapid code analysis.
- `bun check`: Svelte-check for type safety.

## Token Efficiency Guidelines
- **Context First:** Use `ls -R` or `glob` to map structure before reading files.
- **Atomic Edits:** Prefer `replace` with minimal context over `write_file` for large files.
- **Silent Operations:** Use `-q`, `-s`, or `> /dev/null` for verbose CLI tools.
- **Precise Search:** Use `search_file_content` to locate targets before reading.
- **Dense Output:** Provide summaries in high-density bullet points/tables.