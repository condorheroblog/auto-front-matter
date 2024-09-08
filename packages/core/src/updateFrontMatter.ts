import { getArticleFromFrontMatter, getFrontMatterFromDocument, setDuration, setLastModifiedDateOnSave } from ".";
import type { GlobalConfig } from "../../vscode/src/helpers/loadGlobalConfig";

export function updateFrontMatter({
	isCommittedFile,
	userConfig,
	editFileContents,
}: GlobalConfig) {
	const {
		newFileIsInsertLastMod,
		newFileIsInsertReadTime,
		wordsPerMinute,
		insertLastMod,
		insertReadTime,
	} = userConfig;

	let article = getFrontMatterFromDocument(editFileContents);
	if (article && article.data && Object.keys(article.data).length) {
		delete article.data.duration;
		delete article.data.lastmod;

		if (!isCommittedFile) {
			if (!newFileIsInsertLastMod && !newFileIsInsertReadTime)
				return;

			if (newFileIsInsertLastMod)
				article = setLastModifiedDateOnSave(article);

			if (newFileIsInsertReadTime)
				article = setDuration(article, wordsPerMinute!);
		}
		else {
			if (insertLastMod) {
				article = setLastModifiedDateOnSave(article);
			}
			if (insertReadTime) {
				article = setDuration(article, wordsPerMinute);
			}
		}
	}

	return getArticleFromFrontMatter(article);
}
