import type { TextDocument, Uri } from "vscode";
import { getArticleFromFrontMatter, getFrontMatterFromDocument, isTrackedFile, setDuration, setLastModifiedDateOnSave } from "../helpers";

import { updateArticle } from ".";
import type { UserConfig } from ".";

export const fileWillSave = async (
	document: TextDocument,
	fnConfig: UserConfig,
	wsFolder: Uri,
) => {
	const { initialFileInsertLastMod: isInitialInsertLastMod, wordsPerMinute } = fnConfig;
	if (!isInitialInsertLastMod && await isTrackedFile(wsFolder, document.fileName))
		return [];

	let article = getFrontMatterFromDocument(document);
	if (article && article.data && Object.keys(article.data).length) {
		article = setDuration(article, wordsPerMinute!);
		article = setLastModifiedDateOnSave(article);
		const updateDateArticle = getArticleFromFrontMatter(article);
		return [updateArticle(document, updateDateArticle)];
	}

	return [];
};
