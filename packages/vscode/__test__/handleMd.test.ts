import { describe, expect, it } from "vitest";
import matter from "gray-matter";

const mdTemplate = `---
date: 2022-10-28T06:29:54.000Z
lastmod: 2022-11-01T09:23:29.927Z
author: CondorHero
duration: 1min
tags: [hello, world]
categories: blog
---

# Hello World

Sleeping very important for all of us.`;

describe("Markdown's front-matter template", () => {
	it("Markdown front-matter to json", () => {
		const matterResult = matter(mdTemplate);
		expect(matterResult.data).toMatchInlineSnapshot(`
			{
			  "author": "CondorHero",
			  "categories": "blog",
			  "date": 2022-10-28T06:29:54.000Z,
			  "duration": "1min",
			  "lastmod": 2022-11-01T09:23:29.927Z,
			  "tags": [
			    "hello",
			    "world",
			  ],
			}
		`);
	});
});

describe("Update front-matter of Markdown", () => {
	it("Update front-matter's lastmod", () => {
		const matterResult = matter(mdTemplate);
		const lastmod = new Date(new Date(2099, 9, 20, 10, 10, 20, 32).toISOString());
		matterResult.data.lastmod = lastmod;
		const yamlMatter = matter.stringify(matterResult.content, matterResult.data);
		expect(yamlMatter).toMatchInlineSnapshot(`
			"---
			date: 2022-10-28T06:29:54.000Z
			lastmod: 2099-10-20T02:10:20.032Z
			author: CondorHero
			duration: 1min
			tags:
			  - hello
			  - world
			categories: blog
			---

			# Hello World

			Sleeping very important for all of us.
			"
		`);
	});
});
