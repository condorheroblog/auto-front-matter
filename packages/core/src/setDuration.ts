import readingTime from "reading-time";
import type { GrayMatterFile } from "gray-matter";

export function setDuration(article: GrayMatterFile<string>,	wordsPerMinute: number) {
	const duration = readingTime(article.content, { wordsPerMinute }).minutes;
	return {
		...article,
		data: {
			...article.data,
			duration: `${Math.ceil(duration)} min`,
		},
	};
}
