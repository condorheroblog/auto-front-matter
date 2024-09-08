import { describe, expect, it } from "vitest";
import { parseUserConfig } from "../src";

describe("parseUserConfig function", () => {
	it("should parse user config correctly with default settings", () => {
		const localConfig = JSON.stringify({});
		const workspaceFolder = "path/to/workspace";
		const expectedDefaultUserSetting = {
			dirname: [
				"path/to/workspace/**/*.md",
			],
			insertLastMod: true,
			insertReadTime: true,
			newFileIsInsertLastMod: false,
			newFileIsInsertReadTime: false,
			template: {
				content: "\n# Hello World!\n",
				data: {
					author: "CondorHero",
					categories: "blog",
					date: "{{now}}",
					tags: [
						"hello",
						"world",
					],
				},
			},
			wordsPerMinute: 500,
		};
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.dirname).toEqual(expectedDefaultUserSetting.dirname);
		expect(result.insertLastMod).toBe(expectedDefaultUserSetting.insertLastMod);
		expect(result.insertReadTime).toBe(expectedDefaultUserSetting.insertReadTime);
		expect(result.newFileIsInsertLastMod).toBe(expectedDefaultUserSetting.newFileIsInsertLastMod);
		expect(result.newFileIsInsertReadTime).toBe(expectedDefaultUserSetting.newFileIsInsertReadTime);
		expect(result.template.content).toBe(expectedDefaultUserSetting.template.content);
		expect(result.template.data.author).toBe(expectedDefaultUserSetting.template.data.author);
		expect(result.template.data.categories).toBe(expectedDefaultUserSetting.template.data.categories);
		expect(result.template.data.date).toBeDefined();
		expect(result.template.data.tags).toEqual(expectedDefaultUserSetting.template.data.tags);
		expect(result.wordsPerMinute).toBe(expectedDefaultUserSetting.wordsPerMinute);
	});

	it("should parse user config correctly with custom settings", () => {
		const localConfig = JSON.stringify({
			dirname: ["/**/*.md"],
		});
		const workspaceFolder = "path/to/workspace";
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.dirname).toEqual(["path/to/workspace/**/*.md"]);
	});

	it("should parse user config correctly with custom insertLastMod setting", () => {
		const localConfig = JSON.stringify({
			insertLastMod: false,
		});
		const workspaceFolder = "path/to/workspace";
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.insertLastMod).toBe(false);
	});

	it("should parse user config correctly with custom insertReadTime setting", () => {
		const localConfig = JSON.stringify({
			insertReadTime: false,
		});
		const workspaceFolder = "path/to/workspace";
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.insertReadTime).toBe(false);
	});

	it("should parse user config correctly with custom newFileIsInsertLastMod setting", () => {
		const localConfig = JSON.stringify({
			newFileIsInsertLastMod: true,
		});
		const workspaceFolder = "path/to/workspace";
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.newFileIsInsertLastMod).toBe(true);
	});

	it("should parse user config correctly with custom newFileIsInsertReadTime setting", () => {
		const localConfig = JSON.stringify({
			newFileIsInsertReadTime: true,
		});
		const workspaceFolder = "path/to/workspace";
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.newFileIsInsertReadTime).toBe(true);
	});

	it("should parse user config correctly with custom wordsPerMinute setting", () => {
		const localConfig = JSON.stringify({
			wordsPerMinute: 600,
		});
		const workspaceFolder = "path/to/workspace";
		const result = parseUserConfig(localConfig, workspaceFolder);
		expect(result.wordsPerMinute).toBe(600);
	});
});
