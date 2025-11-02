## [unreleased]

### ✨ Features

- Prerender /blog

### 👷 Build System

- Improve workflow

## [1.1.0] - 2025-08-11

### 💥 BREAKING CHANGES

- Completely revamp project

### ✨ Features

- Support fontawesome icons
- Apply vite
- Setup tools and basic route
- Implement dynamic page rendering
- Dynamic loading pages over network
- Code block syntax highlighting
- Support toggle between  light and dark mode
- Dynamic load article list
- Replace unocss by tailwindcss
- Apply polish with new fonts, icons and some minor render improvements
- Support reactive elements
- Blog image able to open as dialog
- Prerender blog posts
- Dynamic title
- Home page
- Custom preprocessor that convert inner md into valid svelte markup
- *(buildsrc)* Enrich markdown rendering
- *(buildsrc)* Estimate time, support callouts, split out boilerplate code
- Refactoring & testing new components
- Toggle dark/light on highliting code
- Filter blogpots by year
- Handle page loading error, remember state when user perform year filter

### 🐛 Bug Fixes

- Correct file's output extension
- Workaround to commit empty directory

### 👷 Build System

- Generate static pages at bundle phase
- Specific environment
- Update package version
- Remove dotenv
- Remove `packageManager` property
- Should not include yarn.lock
- Add new resource and optimization
- Reconfig github action script deployment
- Update build dependencies
- Accept generated *.d.ts
- Remove deprecated dependencies
- Copy favicon from /assets to /static
- Upgrade dependencies and remove unused
- Improve code bundle
- Improve build scripts
- Update CI/CD
- Add prebuild process
- Simplify build process

### 🚀 Deployment

- Use custom github workflow

### ⏪ Revert

- Include yarn.lock

### 📋 Other

- Apply general pattern for all transitions
- Update documents
- Upgrade dependencies
- Update dependencies
- Remove deprecated build process
- Minor enhances
- Update dependencies
- Add docs and GEMINI.md
- Bump dependencies
- Add generated contents
- *(buildsrc)* Add ts types
- Apply version to prevent client cache
- Update dependencies + .editorconfig
- V1.1.0

### ♻️ Code Refactoring

- Move static resources and update build script
- Move .json and .html to separate directories
- Fix lints and css styles
- Delete empty file and restructure code
- Simplify TOC, improve types, cleanup dead code

### 🎨 Code Style

- Make homepage look better
- Better blog content rendering

