import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
	getArticleFromFrontMatter,
	getFrontMatterFromDocument,
	globMdExtension,
	isAddedExtension,
	isSupportedFile,
	parseUserDir,
	setDuration,
	setLastModifiedDateOnSave,
	toMd,
} from "../src";
import {
	WORDS_PER_MINUTE,
} from "../src/constant";

const mdTemplate = `---
date: 2018-10-28T06:29:54.000Z
lastmod: 2020-11-01T09:23:29.927Z
author: CondorHero
duration: 0 min
tags: [hello, world]
categories: blog
---

# Hello World

Sleeping very important for all of us.`;

describe("function", () => {
	it("setDuration", () => {
		const duration = setDuration(matter(mdTemplate), WORDS_PER_MINUTE).data.duration;
		expect(duration === "1 min").toBe(true);
	});

	it("setLastModifiedDateOnSave", () => {
		const article = matter(mdTemplate);
		const newContent = setLastModifiedDateOnSave(article);
		const mdContent = toMd(newContent.content, newContent.data);
		expect(mdContent === mdTemplate).toBe(false);
	});

	it("isSupportedFile", () => {
		const isSupportedPkg = isSupportedFile("pkg");
		expect(isSupportedPkg).toBe(false);
		const isSupportedmd = isSupportedFile("markdown");
		expect(isSupportedmd).toBe(true);
	});

	it("parseUserDir", () => {
		const dirArr1 = parseUserDir(".vscode", process.cwd());
		expect(dirArr1.length).toBe(1);
		const dirArr2 = parseUserDir([".vscode", "packages"], process.cwd());
		expect(dirArr2.length).toBe(2);
	});

	it("isAddedExtension", () => {
		const path = isAddedExtension("pkg");
		expect(path.endsWith(".md")).toBe(true);
	});

	it("globMdExtension", () => {
		const path = globMdExtension("demo");
		expect(path.endsWith("*.md")).toBe(true);
	});

	it("getArticleFromFrontMatter", () => {
		const doc = getArticleFromFrontMatter(matter("demo"));
		expect(doc).toMatchInlineSnapshot(`
			"demo
			"
		`);
	});

	it("getFrontMatterFromDocument", () => {
		const doc = getFrontMatterFromDocument(mdTemplate);
		expect(doc.data).toMatchInlineSnapshot(`
			{
			  "author": "CondorHero",
			  "categories": "blog",
			  "date": 2018-10-28T06:29:54.000Z,
			  "duration": "0 min",
			  "lastmod": 2020-11-01T09:23:29.927Z,
			  "tags": [
			    "hello",
			    "world",
			  ],
			}
		`);
	});

	it("toMd", () => {
		const content = "\nHello world\n";
		const data = { title: "Hello world" };
		const doc = toMd(content, data);
		expect(doc).toMatchInlineSnapshot(`
			"---
			title: Hello world
			---

			Hello world
			"
		`);
	});
});
