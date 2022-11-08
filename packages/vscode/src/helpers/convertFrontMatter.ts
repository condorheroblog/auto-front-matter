import type { TextDocument } from "vscode";
import type { GrayMatterFile } from "gray-matter";
import matter from "gray-matter";

export const getFrontMatterFromDocument = (document: TextDocument) => {
	const fileContents = document.getText();
	return matter(fileContents);
};

export const getArticleFromFrontMatter = (article: GrayMatterFile<string>) => {
	return matter.stringify(article.content, article.data);
};
