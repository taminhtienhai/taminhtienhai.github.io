## v1.1.0

- 💥 Breaking Change: The entire project was overhauled from the ground up.
- 🚀 Core Features:
    - UI/UX: Switched from UnoCSS to TailwindCSS, added FontAwesome icons, implemented a light/dark mode toggle, and improved the overall look with new fonts and better content
        rendering.
    - Content: A custom preprocessor was built to convert Markdown into Svelte components. This adds features like estimated reading time, callouts, and syntax highlighting for
        code blocks. Blog images can now be opened in a dialog.
    - Dynamic Functionality: The site now features dynamic page rendering, network-based content loading, and the ability to filter blog posts by year.
- 🔨 Build & Performance:
    - The build process was significantly improved by generating static pages at build time (prerendering), which enhances performance.
    - The project moved to Vite as its build tool.
    - Continuous Integration/Deployment (CI/CD) workflows were set up and refined.
- 🚜 Refactoring & Code Quality:
    - The codebase was restructured for better organization, including moving static resources and separating generated files.
    - Extensive cleanup was performed to fix lints, improve CSS, simplify components (like the Table of Contents), and remove dead code.
- 🐛 Bug Fixes & Miscellaneous:
    - Addressed issues with file output extensions and version control for empty directories.
    - Dependencies were consistently updated, and unused ones were removed.