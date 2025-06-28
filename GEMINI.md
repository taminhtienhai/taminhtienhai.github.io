# Project Overview

This is a personal blog/portfolio website built with SvelteKit. It serves as a platform to share articles on programming languages, life experiences, and ideas. The site features a custom markdown processing pipeline for blog posts, dynamic routing, and a responsive UI.

## Key Technologies

*   **Framework:** SvelteKit
*   **Styling:** Tailwind CSS, DaisyUI, @tailwindcss/typography, tailwind-scrollbar, tailwindcss-motion
*   **Language:** TypeScript, Svelte
*   **Build Tool:** Vite
*   **Package Manager/Runtime:** Bun
*   **Markdown Processing:** Custom build process using `marked`, `marked-shiki`, `@shikijs/transformers`, `front-matter` for `.svx` (Svelte + Markdown) files.
*   **Code Highlighting:** Highlight.js
*   **Linting:** OXLint

## Project Structure

*   `assets/`: Static assets like images, favicon, and metadata for posts.
*   `buildsrc/`: Contains custom build scripts for markdown processing and content generation (e.g., `converter.ts`, `mdparser.ts`, `preprocessor.ts`, `toc.ts`).
*   `src/`: Main application source code.
    *   `src/app.css`: Global CSS, including Tailwind CSS imports and custom utilities.
    *   `src/app.d.ts`: SvelteKit type declarations.
    *   `src/app.html`: Main HTML template.
    *   `src/lib/`: Reusable components and modules.
        *   `src/lib/blogposts/`: Svelte + Markdown (`.svx`) blog post files.
        *   `src/lib/common/`: Common utilities, constants, and types.
        *   `src/lib/service/`: Data fetching services for posts.
        *   `src/lib/widget/`: Reusable Svelte UI components (e.g., `PostCard`, `TableOfContent`, `LoginForm`).
    *   `src/routes/`: SvelteKit routes defining application pages.
        *   `src/routes/+layout.svelte`: Main application layout.
        *   `src/routes/+page.svelte`: Home page.
        *   `src/routes/blog/`: Blog listing pages (main blog, by badge).
        *   `src/routes/post/[post]/`: Individual blog post pages.
        *   `src/routes/showcase/`: Component showcase page.
*   `static/`: Static files served directly (e.g., `favicon.png`, generated `tocs` and `attrs` JSON files).

## Build and Development

*   **Development:** `bun dev` - Starts the development server.
*   **Build:** `bun build` - Builds the project for production. This command first runs a custom build process in `buildsrc` to generate post metadata and TOCs, then builds the SvelteKit application.
*   **Preview:** `bun preview` - Previews the production build.
*   **Type Checking:** `bun check` - Runs SvelteKit type checks.
*   **Linting:** `bun lint` - Runs OXLint for code quality.

## Deployment

The project uses `@sveltejs/adapter-static` for static site generation, suitable for deployment on platforms like GitHub Pages. The `.github/workflows/deploy.yml` file likely contains the GitHub Actions configuration for automated deployment.