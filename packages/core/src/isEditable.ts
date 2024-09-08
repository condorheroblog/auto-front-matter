import fg from "fast-glob";
import type { Options } from "fast-glob";

export function isEditable(dirname: string[], globOptions: Options, absFileName: string) {
	const fileMatch = fg.sync(dirname, globOptions);
	return fileMatch.includes(absFileName);
}
