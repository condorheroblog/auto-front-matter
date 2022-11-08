import type { TextDocument, Uri } from "vscode";
import { updateArticle } from "../core";
import { getArticleFromFrontMatter, getFrontMatterFromDocument, isTrackedFile } from ".";

export const setLastModifiedDateOnSave = async (
	document: TextDocument,
	isInitialInsertLastMod: boolean,
	wsFolder: Uri,
) => {
	if (!isInitialInsertLastMod && await isTrackedFile(wsFolder, document.fileName))
		return [];

	const article = getFrontMatterFromDocument(document);

	if (article && article.data && Object.keys(article.data).length) {
		article.data.lastMod = new Date(new Date().toISOString());
		const updateDateArticle = getArticleFromFrontMatter(article);
		return [updateArticle(document, updateDateArticle)];
	}

	return [];
};
