# auto-front-matter

<p align="center">
	<a href="https://github.com/condorheroblog/auto-front-matter#readme" target="_blank">
		<img src="https://raw.githubusercontent.com/condorheroblog/auto-front-matter/main/packages/vscode/assets/ico-128x128.png" alt="auto-front-matter"/>
	</a>
	<a href="https://marketplace.visualstudio.com/items?itemName=condorhero.auto-front-matter" title="Check it out on the Visual Studio Marketplace"></a>
</p>

> Automatically insert lastmod/duration in front-matter when you save an md file，and VS Code >= 1.7.3

## Features

1. Automatically insert `lastmod` and `duration` when saving the md file.
2. Create an md file according to the template and use the VS Code command panel.

```bash
Windows: ⇧+ctrl+P
Mac: ⇧+⌘+P
```
![⇧+⌘+P](https://user-images.githubusercontent.com/47056890/201308506-a3200f6a-81be-41f4-994b-57d09613bee5.png)

## Installation

You can get the extension via:

- The VS Code marketplace: [VS Code Marketplace - Auto Front Matter](https://marketplace.visualstudio.com/items?itemName=condorhero.auto-front-matter).
- The extension CLI: `ext install condorhero.auto-front-matter`

## Usage

![demo](https://user-images.githubusercontent.com/47056890/201293665-e720e6a7-5d86-40a2-a612-750889aa89c3.gif)

A `frontmatter.json` file is required in the project directory. The `frontmatter.json` file supports the following fields:

- `dirname`: Specify the directory to be updated, using [glob](https://github.com/isaacs/node-glob) by default, the current directory.
- `globOptions`: [glob](https://github.com/isaacs/node-glob)'s [options](https://github.com/isaacs/node-glob#options).
- `insertLastMod`: Whether to insert `lastmod` in `front-matter`, default `true`.
- `insertReadTime`: Whether to insert `duration` in `front-matter`, default `true`.
- `newFileIsInsertLastMod`: Whether to insert `lastmod` in `front-matter` for uncommitted file, default `false`.
- `newFileIsInsertReadTime`: Whether to insert `duration` in `front-matter` for uncommitted file, default `false`.
- `wordsPerMinute`: words per minute, default `500`.
- `template`: Creating Markdown file depends on this template, default [GET_DEFAULT_FRONT_MATTER](https://github.com/condorheroblog/auto-front-matter/blob/main/packages/core/src/constant/index.ts#LL3C22-L3C22).

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

[MIT](https://github.com/condorheroblog/auto-front-matter/blob/main/LICENSE)
