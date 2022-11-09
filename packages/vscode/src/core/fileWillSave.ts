import type { TextDocument, Uri } from "vscode";
import { getArticleFromFrontMatter, getFrontMatterFromDocument, isUntrackedFile, setDuration, setLastModifiedDateOnSave } from "../helpers";

import { updateArticle } from ".";
import type { UserConfig } from ".";

export const fileWillSave = async (
	document: TextDocument,
	fnConfig: UserConfig,
	wsFolder: Uri,
) => {
	const {
		newFileIsInsertLastMod,
		newFileIsInsertReadTime,
		wordsPerMinute,
		insertLastMod,
		insertReadTime,
	} = fnConfig;

	const hasUntrackedFile = await isUntrackedFile(wsFolder, document.fileName);

	let article = getFrontMatterFromDocument(document);
	if (article && article.data && Object.keys(article.data).length) {
		delete article.data.duration;
		delete article.data.lastmod;

		if (hasUntrackedFile) {
			if (!newFileIsInsertLastMod && !newFileIsInsertReadTime)
				return [];

			if (newFileIsInsertLastMod)
				article = setLastModifiedDateOnSave(article);

			if (newFileIsInsertReadTime)
				article = setDuration(article, wordsPerMinute!);
		}
		else {
			insertLastMod && (article = setLastModifiedDateOnSave(article));
			insertReadTime && (article = setDuration(article, wordsPerMinute));
		}
	}

	const updateDateArticle = getArticleFromFrontMatter(article);
	return [updateArticle(document, updateDateArticle)];
};
