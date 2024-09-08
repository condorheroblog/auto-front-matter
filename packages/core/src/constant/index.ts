export const CONFIG_FILE_NAME = "frontmatter.json";
export const WORDS_PER_MINUTE = 500;
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
