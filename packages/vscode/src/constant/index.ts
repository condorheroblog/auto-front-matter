export const CONFIG_FILE_NAME = "frontmatter.json";
export const WORDS_PER_MINUTE = 50;
export const TEMPLATE_FRONT_MATTER = {
	data: {
		date: new Date(new Date().toISOString()),
		author: "CondorHero",
		tags: ["hello", "world"],
		categories: "blog",
	},
	content: "\n# Hello World!\n",
};
