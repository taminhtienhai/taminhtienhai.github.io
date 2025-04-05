import { readFileSync, readdirSync, unlinkSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { Marked } from 'marked';

import fm from 'front-matter';

import markedShiki from 'marked-shiki'
import { createHighlighter } from 'shiki'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight
} from '@shikijs/transformers'

const OUT_DIR = 'static';
const SUB_DIRS = ['posts','images', 'tocs', 'meta', 'attrs'];
const BLOG_DIR = 'assets/posts';
const META_DIR = 'assets/meta';
// const META_DIR = 'static/meta';
// const IMG_DIR = 'static/img';

if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR);
}

// create OUT_DIR if it doesn't existed
SUB_DIRS.forEach((sub) => {
    const directory = `${OUT_DIR}/${sub}`;
    if (!existsSync(directory)) {
        mkdirSync(directory);
    }
})

// cleanup OUT_DIR
SUB_DIRS.forEach((sub) => {
    const directory = `${OUT_DIR}/${sub}`;
    readdirSync(directory).forEach(file => {
        const file_des = path.join(directory, file);
        unlinkSync(file_des);
    });
})

const parse_md = async (markdown, metadata, link = '') => {
  const highlighter = await createHighlighter({
    // In this case, we include the "js" language specifier to ensure that
    // Shiki applies the appropriate syntax highlighting for Markdown code
    // blocks.
    langs: ['md', 'js'],
    themes: ['github-dark-dimmed']
});

const marked = new Marked().use(markedShiki({
    highlight(code, lang, props) {
        return highlighter.codeToHtml(code, {
          lang,
          theme: 'github-dark-dimmed',
          meta: { __raw: props.join(' ') }, // required by `transformerMeta*`
          transformers: [
            transformerNotationDiff({
              matchAlgorithm: 'v3'
            }),
            transformerNotationHighlight({
              matchAlgorithm: 'v3'
            }),
            transformerNotationWordHighlight({
              matchAlgorithm: 'v3'
            }),
            transformerNotationFocus({
              matchAlgorithm: 'v3'
            }),
            transformerNotationErrorLevel({
              matchAlgorithm: 'v3'
            }),
            transformerMetaHighlight(),
            transformerMetaWordHighlight()
          ],
        });
      }
  }));


  const TOC = [];
  let attr;
  let ID_GEN_TOK = 0;
  let ID_GEN_REN = 0;

  marked.use({ hooks: {
    preprocess(markdown) {
      let { attributes, body } = fm(markdown);

      attr = { ...attributes, link };
      metadata.push(attr);

      for (const prop in attributes) {
        if (prop in this.options) {
          this.options[prop] = attributes[prop];
        }
        /// interpolate yaml's variables
        const regex = new RegExp(`\\{${prop}\\}`, 'g');
        body = body.replace(regex, attributes[prop]);
      }
      return body;
    },
  }, walkTokens: (token) => {
    if (token.type === 'heading') {
      const toc_item = {
        id: `toc_${ID_GEN_TOK++}`,
        level: token.depth,
        text: token.text,
      };
      if (token.depth <= 1) { return; }
      TOC.push(toc_item);
    }
  }, renderer: {
    heading({depth, text}) {
      const id_ref = `toc_${ID_GEN_REN++}`;
      return `<h${depth} id="${id_ref}">${text}</h${depth}>`
    }
  }});


   const content = await marked.parse(markdown);

   return {
    content,
    toc: TOC,
    attr,
   };
};

const md_metadatas = [];
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefghizklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ', 20);

console.log('copy meta files...');
const _ = readdirSync(META_DIR)
.filter(f => f.endsWith('.json'))
.map(f => {
  const filename = f.split('.')[0];
  const buf = readFileSync(path.join(META_DIR, f));
  const meta_des = path.join(`${OUT_DIR}/meta`,`${filename}.json`);
  writeFileSync(meta_des, buf.toString('utf8'));
});

// read SRC_DIR and generate html to OUT_DIR
console.log('start parse markdown..');
const jobs = readdirSync(BLOG_DIR)
.filter(f => f.endsWith('.md'))
.map(async (f) => {
    const filename = nanoid();
    const buf = readFileSync(path.join(BLOG_DIR, f));
    const { content, toc, attr } = await parse_md(buf.toString('utf8'), md_metadatas, filename);
    const post_des = path.join(`${OUT_DIR}/posts`,`${filename}.html`);
    const toc_des = path.join(`${OUT_DIR}/tocs`,`${filename}.json`);
    const attr_des = path.join(`${OUT_DIR}/attrs`,`${filename}.json`);

    writeFileSync(post_des, content);
    writeFileSync(toc_des, JSON.stringify(toc));
    writeFileSync(attr_des, JSON.stringify(attr));
});

Promise.all(jobs).then(() => {
  writeFileSync(path.join(`${OUT_DIR}/meta`,`all_post.json`), JSON.stringify(md_metadatas));

  // todo: badge classify

  const BadgeMapping = new Map();

  for (const post of md_metadatas) {
    const tags = post?.tags ?? [];

    for (const tag of tags) {
      if (BadgeMapping.has(tag)) {
        const curposts = BadgeMapping.get(tag);
        BadgeMapping.set(tag, [...curposts, post]);
      } else {
        BadgeMapping.set(tag, [post]);
      }
    }
  }


  for (const [id, posts] of BadgeMapping.entries()) {
    writeFileSync(path.join(`${OUT_DIR}/meta`,`badge_${id}.json`), JSON.stringify(posts));
  }
});
