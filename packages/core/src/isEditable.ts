import type { Options } from "fast-glob";
import fg from "fast-glob";

export const isEditable = (dirname: string[], globOptions: Options, absFileName: string) => {
	const fileMatch = fg.sync(dirname, globOptions);
	return fileMatch.includes(absFileName);
};
