# auto-front-matter

<p align="center">
	<a href="https://github.com/condorheroblog/auto-front-matter#readme" target="_blank">
		<img src="https://raw.githubusercontent.com/condorheroblog/auto-front-matter/main/packages/vscode/src/assets/ico-128x128.png" alt="auto-front-matter"/>
  </a>
</p>

Automatic Front Matter for Markdown

<p>
		<a href="https://www.npmjs.com/package/auto-front-matter" target="__blank">
			<img src="https://img.shields.io/npm/v/auto-front-matter.svg?color=a1b858" alt="NPM version">
		</a>
		<a href="https://www.npmjs.com/package/auto-front-matter" target="__blank">
				<img alt="NPM Downloads" src="https://img.shields.io/npm/dm/auto-front-matter.svg?color=50a36f">
		</a>
</p>

## features

auto-front-matter provides two commands: `auto-front-matter watch` and `auto-front-matter create`.

1. `auto-front-matter watch`

Automatically insert `lastmod` and `duration` when saving the md file.

![auto-front-matter watch](https://user-images.githubusercontent.com/47056890/201309251-36504c15-3ec7-4e0d-9602-ba55057bb747.png)

2. `auto-front-matter create`

![auto-front-matter create](https://user-images.githubusercontent.com/47056890/201309683-1aec0d1d-3e4d-4652-a305-be26d7f3600e.png)

## Installation

```sh
npm install -D auto-front-matter
```

A `frontmatter.json` file is required in the project directory. The `frontmatter.json` file supports the following fields:

- `dirname`: Specify the directory to be updated.using [glob](https://github.com/isaacs/node-glob), default current directory.
- `globOptions`: [glob](https://github.com/isaacs/node-glob)'s [options](https://github.com/isaacs/node-glob#options).
- `insertLastMod`: Whether to insert `lastmod` in `front-matter`, default `true`.
- `insertReadTime`: Whether to insert `duration` in `front-matter`, default `true`.
- `newFileIsInsertLastMod`: Whether to insert `lastmod` in `front-matter` for uncommitted file, default `false`.
- `newFileIsInsertReadTime`: Whether to insert `duration` in `front-matter` for uncommitted file, default `false`.
- `wordsPerMinute`: words per minute, default `500`.
- `template`: Creating Markdown file depends on this template, default [TEMPLATE_FRONT_MATTER](https://github.com/condorheroblog/auto-front-matter/blob/main/packages/core/src/constant/index.ts#LL3C22-L3C22).

```js
const TEMPLATE_FRONT_MATTER = {
	data: {
		date: new Date(new Date().toISOString()),
		author: "CondorHero",
		tags: ["hello", "world"],
		categories: "blog",
	},
	content: "\n# Hello World!\n",
};
```

## License

[MIT](https://github.com/condorheroblog/auto-front-matter/blob/main/LICENSE)


