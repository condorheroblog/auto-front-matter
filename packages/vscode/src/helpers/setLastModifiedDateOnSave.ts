import type { GrayMatterFile } from "gray-matter";

export const setLastModifiedDateOnSave = (
	article: GrayMatterFile<string>,
) => {
	const newArticle = { ...article };
	newArticle.data.lastMod = new Date(new Date().toISOString());
	return newArticle;
};