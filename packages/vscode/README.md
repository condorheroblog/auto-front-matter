# auto-front-matter

<p align="center">
	<a href="https://github.com/condorheroblog/auto-front-matter#readme" target="_blank">
		<img src="https://raw.githubusercontent.com/condorheroblog/auto-front-matter/main/packages/vscode/assets/ico-128x128.png" alt="auto-front-matter"/>
	</a>
	<a href="https://marketplace.visualstudio.com/items?itemName=condorhero.auto-front-matter" title="Check it out on the Visual Studio Marketplace"></a>
</p>

> Automatically insert `lastmod` and `duration` fields in the front matter when saving Markdown files，and VS Code >= 1.93.1

## Features

1. Automatically insert `lastmod` and `duration` fields in the front matter when saving Markdown files.
2. Generate new Markdown files based on customizable templates using the VS Code command palette.

## Installation

You can get the extension via:

- The VS Code marketplace: [VS Code Marketplace - Auto Front Matter](https://marketplace.visualstudio.com/items?itemName=condorhero.auto-front-matter).
- The extension CLI: `ext install condorhero.auto-front-matter`

## Usage

![Demo](https://user-images.githubusercontent.com/47056890/201293665-e720e6a7-5d86-40a2-a612-750889aa89c3.gif)

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

## Commands

```bash
Windows: ⇧+ctrl+P
Mac: ⇧+⌘+P
```

![⇧+⌘+P](https://user-images.githubusercontent.com/47056890/201308506-a3200f6a-81be-41f4-994b-57d09613bee5.png)

## License

[MIT](https://github.com/condorheroblog/auto-front-matter/blob/main/LICENSE) License © 2022-PRESENT [CondorHeroBlog](https://github.com/condorheroblog)
