import type { TextDocument, Uri } from "vscode";
import { getArticleFromFrontMatter, getFrontMatterFromDocument, isTrackedFile, setDuration, setLastModifiedDateOnSave } from "../helpers";

import { updateArticle } from ".";

export const fillWillSave = async (
	document: TextDocument,
	isInitialInsertLastMod: boolean,
	wsFolder: Uri,
) => {
	if (!isInitialInsertLastMod && await isTrackedFile(wsFolder, document.fileName))
		return [];

	let article = getFrontMatterFromDocument(document);
	if (article && article.data && Object.keys(article.data).length) {
		article = setDuration(article);
		article = setLastModifiedDateOnSave(article);
		const updateDateArticle = getArticleFromFrontMatter(article);
		return [updateArticle(document, updateDateArticle)];
	}

	return [];
};
