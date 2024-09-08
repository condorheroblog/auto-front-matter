import type { GrayMatterFile } from "gray-matter";

export function setLastModifiedDateOnSave(article: GrayMatterFile<string>) {
	return {
		...article,
		data: {
			...article.data,
			lastmod: new Date(new Date().toISOString()),
		},
	};
}
