import type { GrayMatterFile } from "gray-matter";
import readingTime from "reading-time";

export const setDuration = (
	article: GrayMatterFile<string>,
	wordsPerMinute: number,
) => {
	const newArticle = { ...article };

	const duration = readingTime(newArticle.content, { wordsPerMinute }).minutes;
	newArticle.data.duration = `${Math.ceil(duration)} min`;
	return newArticle;
};
