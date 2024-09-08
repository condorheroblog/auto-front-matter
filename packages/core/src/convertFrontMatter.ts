import matter from "gray-matter";
import type { GrayMatterFile } from "gray-matter";

export function getFrontMatterFromDocument(fileContents: string) {
	return matter(fileContents);
}

export function getArticleFromFrontMatter(article: GrayMatterFile<string>) {
	return matter.stringify(article.content, article.data);
}

export function toMd(content: string, data: object) {
	return matter.stringify(content, data);
}
