## Issues

- [x] communicate between state-machine? check `Systems` section.
- [x] `$state.target` not work, only `invoke.onDone.target` work???

## Ideas

- [ ] consider `unocss-preset-radix` color palette
- [ ] Load post's title dynamically when user click into it
    - [ ] extract metadata from loaded html
        - Where is metadata located in html?
        - How do you hide it in render phase?

## Style

- [x] choose color pallette
- [ ] design page icon
- [ ] improve color stylesheet

## Frontend

### Styling

- [x] support page transition
- [x] support code syntax highlighting
- [x] support dark/light theme
- [ ] support multi languages
- [ ] make code syntax highlighting feasible to switch between light and dark theme
- [ ] add icon bookmark on top-right of each article section
- [ ] table of contents
- [ ] sticky search-bar


### Effect & Animation

- [ ] text typing effect
- [ ] hover effect on blog's items

## Backend

- [x] able to convert `.md` into `.html` in bundle phase
- [x] blog content should be loaded during runtime
- [ ] post content preview: a short brief about article content
- [ ] build logging, network tracing and traffic monitoring
- [ ] make navbar sticky top and smaller when scroll
- [ ] when scrolling article, replace the page's logo by the last section's id, enable user to
navigate back to the last section they just read, this feature bring huge advantage on reading experiment
- [ ] support bookmark system (localStorage)
- [ ] support text highlighting