# auto-front-matter

<p align="center">
	<a href="https://github.com/condorheroblog/auto-front-matter#readme" target="_blank">
		<img src="https://raw.githubusercontent.com/condorheroblog/auto-front-matter/main/packages/vscode/assets/ico-128x128.png" alt="auto-front-matter"/>
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
		<a href="https://marketplace.visualstudio.com/items?itemName=condorhero.auto-front-matter" target="__blank">
			<img src="https://img.shields.io/visual-studio-marketplace/v/condorhero.auto-front-matter.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" />
		</a>
		<a href="https://www.jsdocs.io/package/auto-front-matter">
			<img src="https://img.shields.io/badge/jsDocs.io-reference-blue" alt="jsDocs">
		</a>
		<a href="https://github.com/condorheroblog/auto-front-matter/blob/main/LICENSE" target="__blank">
				<img alt="License" src="https://img.shields.io/github/license/condorheroblog/auto-front-matter.svg">
		</a>
		<br />
</p>

## Features

1. Automatically insert `lastmod` and `duration` fields in the front matter when saving Markdown files.
2. Generate new Markdown files based on customizable templates.

## Installation

```sh
npm install -D auto-front-matter
```

## Commands

auto-front-matter provides two commands:

```sh
auto-front-matter watch
auto-front-matter create
```

1. `auto-front-matter watch`

Automatically insert `lastmod` and `duration` when saving the md file.

![auto-front-matter watch](https://user-images.githubusercontent.com/47056890/201309251-36504c15-3ec7-4e0d-9602-ba55057bb747.png)

2. `auto-front-matter create`

![auto-front-matter create](https://user-images.githubusercontent.com/47056890/201309683-1aec0d1d-3e4d-4652-a305-be26d7f3600e.png)

## Configuration

A `frontmatter.json` file is required in the project root directory. This file supports the following configuration options:

- `dirname`: Specifies the directory to be processed using [glob](https://github.com/isaacs/node-glob) syntax. Defaults to the current directory.
- `globOptions`: Additional [options](https://github.com/isaacs/node-glob#options) for the glob pattern.
- `insertLastMod`: Determines whether to insert `lastmod` in the front matter. Default is `true`.
- `insertReadTime`: Determines whether to insert `duration` in the front matter. Default is `true`.
- `newFileIsInsertLastMod`: Determines whether to insert `lastmod` in the front matter for new, uncommitted files. Default is `false`.
- `newFileIsInsertReadTime`: Determines whether to insert `duration` in the front matter for new, uncommitted files. Default is `false`.
- `wordsPerMinute`: Specifies the reading speed in words per minute for duration calculation. Default is `500`.
- `template`: Defines the template used for creating new Markdown files.

Here's a default `template` example of a `frontmatter.json` configuration:

```json
{
	"template": {
		"data": {
			"date": "{{now}}",
			"author": "CondorHero",
			"tags": [
				"hello",
				"world"
			],
			"categories": "blog"
		},
		"content": "\n# Hello World!\n"
	}
}
```

The `date` field supports four parameters:

1. `year` - The year of the current date.
2. `month` - The month of the current date.
3. `day` - The day of the current date.
4. `now` - The current date.

```js
export function GET_DEFAULT_FRONT_MATTER() {
	return {
		data: {
			date: new Date(new Date().toISOString()),
			author: "CondorHero",
			tags: ["hello", "world"],
			categories: "blog",
		},
		content: "\n# Hello World!\n",
	};
}
```

## License

[MIT](https://github.com/condorheroblog/auto-front-matter/blob/main/LICENSE) License © 2022-PRESENT [CondorHeroBlog](https://github.com/condorheroblog)
