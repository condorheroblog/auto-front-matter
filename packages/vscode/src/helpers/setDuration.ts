import type { GrayMatterFile } from "gray-matter";
import readingTime from "reading-time";

export const setDuration = (
	article: GrayMatterFile<string>,
) => {
	const newArticle = { ...article };
	const duration = readingTime(newArticle.content, { wordsPerMinute: 500 }).minutes;
	newArticle.data.duration = `${Math.ceil(duration)} min`;
	return newArticle;
};
