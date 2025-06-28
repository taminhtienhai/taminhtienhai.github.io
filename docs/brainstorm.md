## Blog Metadata

- author: string
- title: string
- description: string
- created_date: string
- updated_date: string
- table_of_contents: { id: number, index: string, name: string, parent_id: number, depth: number }[]


## Issues

- [x] marked shiki fail to parse Rust code (**)
- [x] allow TOC scrolling to focusing header item
- [ ] minimize navbar when scroll content down
- [ ] Theme not working on mobile device

## Improvements

- [x] markdown custom parser (*)
- [x] build pipeline overhaul (*)
- [x] use basis to arrange layout
- [ ] markdown
    - [x] better <u> styles
    - [ ] codeblock height as least oneline minimum
    - [ ] support directives
- [ ] codeblock
    - [ ] compile-error: replace "copy" icon with "bug" icon
    - [x] copy button
    - [ ] collapsible
    - [ ] expandable with max-lines show
- [ ] improve search functional
    - [ ] search ignorecase
    - [ ] similarity search

## Todos

- [ ] display `update_time` and reading estimate time as subtitle
- [ ] `tags` should be clickable
- [ ] URL with header's id instantly jump into that header
- [ ] home page (self introduce, mini game)
- [x] dynamic title
- [x] deployment
- [x] skeleton loading
- [x] badges should have fixed color
- [x] replace blog exact name URL with random UUID
- [x] ~~paging load posts~~ load when srolling to bottom
- [x] better responsive
- [ ] enhance search functional
    - [x] tag filter
    - [ ] timeline filter
- [ ] revamp network error ui
- [ ] new logo - new font
- [ ] authentication
- [ ] store user preferences (theme, history)

## Features

- [ ] fishing game in home page
- [ ] allow registration user to comment on article
- [ ] embedded asccinema terminal tutorial (https://docs.asciinema.org)
- [ ] basic authentication
- [ ] traffic tracking


## What content should I place at HomePage?

- [ ] tell a story about my experience
- [ ] interactive

---

## Brainstorm

- [ ] clear steps to build src
    - convert md to html
    - build Table of Contents
    - build blog posts indexes
    - build blog posts metadata
    - copy static resources (image, video, etc..)
- [ ] what type of custom element?
    - [ ] underline
    - [ ] tooltip
    - [ ] collapse
    - [ ] diff
- [ ] split large code into modules (/buildsrc)
- [ ] how to use svelte component in markdown?
- [ ] how to use tailwindcss in markdown

## Solutions

- Build custom `marked` plugin to parse custom elements
- Consider between vite-preprocessor and svete-preprocessor