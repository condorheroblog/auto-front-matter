import type { GrayMatterFile } from "gray-matter";
import matter from "gray-matter";

export const getFrontMatterFromDocument = (fileContents: string) => {
	return matter(fileContents);
};

export const getArticleFromFrontMatter = (article: GrayMatterFile<string>) => {
	return matter.stringify(article.content, article.data);
};

export const toMd = (content: string, data: object) => {
	return matter.stringify(content, data);
};
